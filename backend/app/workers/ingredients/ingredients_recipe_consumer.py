import pika
import json
import os
from dotenv import load_dotenv
import requests

def fetch_ingredients_for_recipe(api_key, recipe_id):
    """Fetch ingredients for a specific recipe by recipe_id using Spoonacular API."""
    url = f"https://api.spoonacular.com/recipes/{recipe_id}/ingredientWidget.json"
    params = {
        'apiKey': api_key
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        ingredients_data = response.json()
        return ingredients_data.get('ingredients', [])
    except requests.RequestException as e:
        print(f"HTTP request error: {e}")
        return []

def on_fetch_ingredients_request(ch, method, props, body, api_key):
    print("Received request for recipe ingredients")
    
    message = json.loads(body)
    recipe_id = message.get('recipe_id')
    
    ingredients = fetch_ingredients_for_recipe(api_key, recipe_id)
    
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
    load_dotenv()
    api_key = os.getenv('SPOONACULAR_API_KEY')

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    queue_name = 'ingredients_recipe_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, props, body: on_fetch_ingredients_request(ch, method, props, body, api_key))

    print(" [x] Awaiting requests for recipe ingredients")
    channel.start_consuming()

if __name__ == "__main__":
    main()
