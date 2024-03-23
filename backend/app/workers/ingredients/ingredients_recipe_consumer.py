import pika
import json
import mysql.connector
from mysql.connector import Error

def fetch_ingredients_for_recipe(db_config, recipe_id):
    """Fetch ingredients for a specific recipe by recipe_id."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT * FROM Ingredients
        WHERE recipe_id = %s
        """
        cursor.execute(query, (recipe_id,))
        ingredients = cursor.fetchall()
        cursor.close()
        conn.close()
        return ingredients
    except Error as e:
        print(f"Database error: {e}")
        return []

def on_fetch_ingredients_request(ch, method, props, body, db_config):
    print("Received request for recipe ingredients")
    
    message = json.loads(body)
    recipe_id = message.get('recipe_id')
    
    ingredients = fetch_ingredients_for_recipe(db_config, recipe_id)
    
    if ingredients:
        response = json.dumps({'success': True, 'ingredients': ingredients})
    else:
        response = json.dumps({'success': False, 'message': 'Ingredients not found'})
    
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

    queue_name = 'ingredients_recipe_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, props, body: on_fetch_ingredients_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests for recipe ingredients")
    channel.start_consuming()

if __name__ == "__main__":
    main()
