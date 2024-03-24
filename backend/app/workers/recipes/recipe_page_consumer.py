import pika
import json
import mysql.connector
from mysql.connector import Error
import json
from decimal import Decimal
import os
from dotenv import load_dotenv

class EnhancedJSONEncoder(json.JSONEncoder):
    """A JSON encoder that handles Decimals."""

    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return super().default(obj)


def fetch_recipe_by_id(db_config, recipe_id):
    """Fetch a single recipe and its average rating by recipe ID."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT R.*, AVG(RT.rating) AS average_rating
        FROM Recipes R
        LEFT JOIN Ratings RT ON R.recipe_id = RT.recipe_id
        WHERE R.recipe_id = %s
        GROUP BY R.recipe_id
        """
        cursor.execute(query, (recipe_id,))
        recipe = cursor.fetchone()
        cursor.close()
        conn.close()
        return recipe
    except Error as e:
        print(f"Database error: {e}")
        return None


def on_fetch_recipe_request(ch, method, props, body, db_config):
    print("Received request for a single recipe")

    message = json.loads(body)
    recipe_id = message.get('recipe_id')

    recipe = fetch_recipe_by_id(db_config, recipe_id)

    if recipe:
        # Use the custom JSON encoder
        response = json.dumps(
            {'success': True, 'recipe': recipe}, cls=EnhancedJSONEncoder)
    else:
        response = json.dumps(
            {'success': False, 'message': 'Recipe not found'}, cls=EnhancedJSONEncoder)

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    load_dotenv()
    db_config = {
        'host': os.getenv('DATABASE_HOST'),
        'port': 3306,
        'user': os.getenv('DATABASE_USER'),
        'password': os.getenv('DATABASE_PASSWORD'),
        'database': os.getenv('DATABASE')
    }

    connection = pika.BlockingConnection(
        pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='recipe_fetch_queue')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='recipe_fetch_queue', on_message_callback=lambda ch,
                          method, props, body: on_fetch_recipe_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests for a single recipe")
    channel.start_consuming()


if __name__ == "__main__":
    main()
