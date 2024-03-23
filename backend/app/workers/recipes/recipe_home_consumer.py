import pika
import json
import mysql.connector
from mysql.connector import Error

def fetch_trending_recipes(db_config):
    """Fetch trending recipes sorted by view count."""
    print(3)
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM Recipes ORDER BY views DESC"
        cursor.execute(query)
        recipes = cursor.fetchall()
        cursor.close()
        conn.close()
        return recipes
    except Error as e:
        print(f"Database error: {e}")
        return []

def on_fetch_trending_request(ch, method, props, body, db_config):
    print("Received request for trending recipes")
    
    recipes = fetch_trending_recipes(db_config)
    
    response = json.dumps({'success': True, 'recipes': recipes})
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def fetch_recent_recipes(db_config):
    """Fetch the most recently created recipes."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM Recipes ORDER BY created_at DESC"
        cursor.execute(query)
        recipes = cursor.fetchall()
        cursor.close()
        conn.close()
        return recipes
    except Error as e:
        print(f"Database error: {e}")
        return []

def on_fetch_recent_request(ch, method, props, body, db_config):
    print("Received request for recent recipes")
    
    recipes = fetch_recent_recipes(db_config)
    
    response = json.dumps({'success': True, 'recipes': recipes})
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)

def main():
    db_config = {
        'host': 'localhost',
        'port': 3306,
        'user': 'admin',
        'password': 'password',
        'database': 'recipe_app'
    }

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='recipes_trending_queue')
    channel.queue_declare(queue='recipes_recent_queue')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='recipes_trending_queue', on_message_callback=lambda ch, method, props, body: on_fetch_trending_request(ch, method, props, body, db_config))
    channel.basic_consume(queue='recipes_recent_queue', on_message_callback=lambda ch, method, props, body: on_fetch_recent_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests for recipes")
    channel.start_consuming()

if __name__ == "__main__":
    main()
