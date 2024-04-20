import pika
import json
import requests
import mysql.connector
from mysql.connector import Error
from decimal import Decimal
import os
from dotenv import load_dotenv

class EnhancedJSONEncoder(json.JSONEncoder):
    """A JSON encoder that handles Decimals."""
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return super().default(obj)

def fetch_recipe_from_api(recipe_id):
    """Fetch recipe details from Spoonacular API by recipe ID."""
    url = f"https://api.spoonacular.com/recipes/{recipe_id}/information"
    params = {
        'apiKey': os.getenv("SPOONACULAR_API_KEY"),
        'includeNutrition': 'true'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"API error: {response.status_code} - {response.text}")
        return None

def fetch_ratings(db_config, recipe_id):
    """Fetch average ratings for a recipe from the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT AVG(rating) AS average_rating
        FROM Ratings
        WHERE recipe_id = %s
        """
        cursor.execute(query, (recipe_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return result
    except Error as e:
        print(f"Database error: {e}")
        return None

def on_fetch_recipe_request(ch, method, props, body, db_config):
    print("Received request for a single recipe")

    message = json.loads(body)
    recipe_id = message.get('recipe_id')

    recipe = fetch_recipe_from_api(recipe_id)
    ratings = fetch_ratings(db_config, recipe_id)

    if recipe and ratings:
        recipe['average_rating'] = ratings['average_rating']
        response = json.dumps({'success': True, 'recipe': recipe}, cls=EnhancedJSONEncoder)
    else:
        response = json.dumps({'success': False, 'message': 'Recipe not found'}, cls=EnhancedJSONEncoder)

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

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='recipe_fetch_queue')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='recipe_fetch_queue', on_message_callback=lambda ch, method, props, body:
                          on_fetch_recipe_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests for a single recipe")
    channel.start_consuming()

if __name__ == "__main__":
    main()
