import os
import pika
import json
import requests
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv


def fetch_trending_recipes():
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": os.getenv("SPOONACULAR_API_KEY"),
        "sort": "trending",
        "addRecipeInformation": True,
        "number": 10,
        "includeNutrition": 'true'
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json().get("results", [])


def fetch_recent_recipes():
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": os.getenv("SPOONACULAR_API_KEY"),
        "sort": "date",
        "addRecipeInformation": True,
        "number": 10,
        "includeNutrition": 'true'
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json().get("results", [])

def fetch_user_preferences(user: str, db_config):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT dietary_restrictions, TDEE
            FROM Users
            WHERE username = %s
        """
        cursor.execute(query, (user,))
        user_prefs = cursor.fetchone()
        cursor.close()
        conn.close()

        if user_prefs and user_prefs.get("dietary_restrictions"):
            user_prefs["dietary_restrictions"] = eval(user_prefs["dietary_restrictions"])
        
        return user_prefs
    except Error as e:
        print(f"Database error: {e}")
        return None

def fetch_recommended_recipes(user: str, db_config):
    user_prefs = fetch_user_preferences(user, db_config)
    if not user_prefs:
        return []

    dietary_restrictions = user_prefs.get("dietary_restrictions", [])
    
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": os.getenv("SPOONACULAR_API_KEY"),
        "sort": "popularity",
        "addRecipeInformation": True,
        "number": 10,
        "includeNutrition": True,
    }

    if dietary_restrictions:
        params["diet"] = dietary_restrictions

    response = requests.get(url, params=params)
    response.raise_for_status()
    recipes = response.json().get("results", [])

    # Adding average rating to each recipe
    for recipe in recipes:
        recipe_id = recipe.get("id")
        average_rating = fetch_average_rating_from_db(recipe_id, db_config)
        recipe["average_rating"] = average_rating if average_rating else None

    return recipes


def fetch_average_rating_from_db(recipe_id, db_config):
    """Fetch the average rating from the database for a given recipe ID."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT AVG(rating) as average_rating
            FROM Ratings
            WHERE recipe_id = %s
        """
        cursor.execute(query, (recipe_id,))
        average_rating_result = cursor.fetchone()
        # Convert Decimal to float for JSON serialization
        average_rating = float(
            average_rating_result['average_rating']) if average_rating_result['average_rating'] is not None else None
        cursor.close()
        conn.close()
        return average_rating
    except Error as e:
        print(f"Database error: {e}")
        return None


def on_fetch_trending_request(ch, method, props, body, db_config):
    print("Received request for trending recipes")
    recipes = fetch_trending_recipes()
    for recipe in recipes:
        recipe_id = recipe.get("id")
        average_rating = fetch_average_rating_from_db(recipe_id, db_config)
        recipe["average_rating"] = average_rating if average_rating else None
    response = json.dumps({"success": True, "recipes": recipes})

    ch.basic_publish(exchange="",
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def on_fetch_recent_request(ch, method, props, body, db_config):
    print("Received request for recent recipes")
    recipes = fetch_recent_recipes()
    for recipe in recipes:
        recipe_id = recipe.get("id")
        average_rating = fetch_average_rating_from_db(recipe_id, db_config)
        recipe["average_rating"] = average_rating if average_rating else None
    response = json.dumps({"success": True, "recipes": recipes})

    ch.basic_publish(exchange="",
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)

def on_fetch_recommended_request(ch, method, props, body, db_config):
    print("Received request for recent recipes")
    request = json.loads(body)
    username = request['username']
    recipes = fetch_recommended_recipes(username, db_config=db_config) # Change to fetch_recommended_recipes()
    for recipe in recipes:
        recipe_id = recipe.get("id")
        average_rating = fetch_average_rating_from_db(recipe_id, db_config)
        recipe["average_rating"] = average_rating if average_rating else None
    response = json.dumps({"success": True, "recipes": recipes})

    ch.basic_publish(exchange="",
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    load_dotenv()
    db_config = {
        "host": os.getenv("DATABASE_HOST"),
        "port": 3306,
        "user": os.getenv("DATABASE_USER"),
        "password": os.getenv("DATABASE_PASSWORD"),
        "database": os.getenv("DATABASE"),
    }
    connection = pika.BlockingConnection(
        pika.ConnectionParameters("localhost"))
    channel = connection.channel()
    channel.queue_declare(queue="recipes_trending_queue")
    channel.queue_declare(queue="recipes_recent_queue")
    channel.queue_declare(queue="recipes_recommended_queue")
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue="recipes_trending_queue",
                          on_message_callback=lambda ch, method, props, body: on_fetch_trending_request(ch, method, props, body, db_config))
    channel.basic_consume(queue="recipes_recent_queue",
                          on_message_callback=lambda ch, method, props, body: on_fetch_recent_request(ch, method, props, body, db_config))
    channel.basic_consume(queue="recipes_recommended_queue",
                          on_message_callback=lambda ch, method, props, body: on_fetch_recommended_request(ch, method, props, body, db_config))
    print(" [x] Awaiting requests for recipes")
    channel.start_consuming()


if __name__ == "__main__":
    main()
