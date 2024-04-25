import pika
import json
import os
from dotenv import load_dotenv
import requests

def search_recipes(api_key, query, number=10, offset=0):
    """Search for recipes based on a query using the Spoonacular API."""
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        'apiKey': api_key,
        'query': query,
        'number': number,
        'offset': offset,
        'addRecipeInformation': True 
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        search_results = response.json()
        return search_results.get('results', [])
    except requests.RequestException as e:
        print(f"HTTP request error: {e}")
        return []

def on_search_recipes_request(ch, method, props, body, api_key):
    print("Received search request for recipes")
    
    message = json.loads(body)
    query = message.get('query')
    number = message.get('number')
    offset = message.get('offset', 0)  # Pagination offset
    
    recipes = search_recipes(api_key, query, number=number, offset=offset)
    
    if recipes:
        response = json.dumps({'success': True, 'recipes': recipes})
    else:
        response = json.dumps({'success': False, 'message': 'No recipes found'})
    
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

    queue_name = 'recipe_search_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, props, body: on_search_recipes_request(ch, method, props, body, api_key))

    print(" [x] Awaiting requests for recipe searches")
    channel.start_consuming()

if __name__ == "__main__":
    main()
