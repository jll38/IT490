import pika
import json
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

def user_exists(db_config, username):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Users WHERE username = %s", (username,))
        user_record = cursor.fetchone()
        cursor.close()
        conn.close()
        return user_record is not None
    except Error as e:
        print(f"Database error: {e}")
        return False  #

import mysql.connector
from mysql.connector import Error

def onboard_user(db_config, username, restrictions, tdee):
    """Insert a new user into the database."""
    print(user_exists(db_config, username))
    print(username)
    print(restrictions)
    print(tdee)
    if not user_exists(db_config, username):
        return False  # User already exists

    try:
        conn = mysql.connector.connect(**db_config)
        with conn.cursor() as cursor:
            cursor.execute("UPDATE Users SET onboarding_complete=%s, dietary_restrictions=%s, TDEE=%s WHERE username=%s", (1, str(restrictions), tdee, username))
            print(2)
            conn.commit()
    except Error as e:
        print(f"Database error during onboarding: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False
    finally:
        conn.close()

    return True


def on_request(ch, method, props, body, db_config):
    request = json.loads(body)
    username = request['username']
    restrictions = request['restrictions']
    tdee = request['tdee']

    print(f"Received onboarding request for {username}")

    registration_success = onboard_user(db_config, username, restrictions, tdee)
    response = json.dumps({'success': registration_success})
    print(response)
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
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

    # Establish connection to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Ensure the queue exists
    channel.queue_declare(queue='onboarding_queue')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='onboarding_queue', on_message_callback=lambda ch, method, props, body: on_request(ch, method, props, body, db_config))

    print(" [x] Awaiting registration requests")
    channel.start_consuming()

if __name__ == "__main__":
    main()
