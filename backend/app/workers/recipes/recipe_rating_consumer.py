import pika
import json
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
def add_or_update_rating(db_config, recipe_id, user_id, rating):
    """Add or update a recipe rating in the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        # Check if the rating already exists
        check_query = """
        SELECT rating_id FROM Ratings
        WHERE recipe_id = %s AND user_id = %s
        """
        cursor.execute(check_query, (recipe_id, user_id))
        existing_rating = cursor.fetchone()
        if existing_rating:
            # Update the existing rating
            update_query = """
            UPDATE Ratings
            SET rating = %s
            WHERE recipe_id = %s AND user_id = %s
            """
            cursor.execute(update_query, (rating, recipe_id, user_id))
        else:
            # Insert a new rating
            insert_query = """
            INSERT INTO Ratings (recipe_id, user_id, rating)
            VALUES (%s, %s, %s)
            """
            cursor.execute(insert_query, (recipe_id, user_id, rating))
        
        conn.commit()
        cursor.close()
        conn.close()
        return True
    except Error as e:
        print(f"Database error: {e}")
        return False

def on_set_rating_request(ch, method, props, body, db_config):
    print("Received request to set a recipe rating")
    
    message = json.loads(body)
    recipe_id = message.get('recipe_id')
    user_id = message.get('user_id')
    rating = message.get('rating')
    
    success = add_or_update_rating(db_config, recipe_id, user_id, rating)
    
    response = json.dumps({'success': success})
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)

def main():
    db_config = {
        'host': os.getenv('DATABASE_HOST'),
        'port': 3306,
        'user': os.getenv('DATABASE_USER'),
        'password': os.getenv('DATABASE_PASSWORD'),
        'database': os.getenv('DATABASE')
    }

    connection = pika.BlockingConnection(pika.ConnectionParameters(os.getenv('RABBITMQ_HOST')))
    channel = connection.channel()

    queue_name = 'recipe_rating_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, props, body: on_set_rating_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting rating requests")
    channel.start_consuming()

if __name__ == "__main__":
    main()
