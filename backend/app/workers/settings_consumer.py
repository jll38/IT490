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

def get_settings(db_config, username):
    if not user_exists(db_config, username):
        return {'success': False}

    try:
        conn = mysql.connector.connect(**db_config)
        with conn.cursor() as cursor:
            cursor.execute("SELECT dietary_restrictions, TDEE FROM Users WHERE username=%s", (username,))
            user_record = cursor.fetchone()
            print(user_record)
            print(3)
            if user_record:
                return {'success': True, 'dietary_restrictions': user_record[0], 'TDEE': user_record[1]}
            else:
                return {'success': False}
    except Error as e:
        print(f"Database error retrieving settings: {e}")
        return {'success': False}
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {'success': False}
    finally:
        conn.close()

def on_request(ch, method, props, body, db_config):
    request = json.loads(body)
    username = request['username']
    print(f"Received settings request for {username}")

    settings_response = get_settings(db_config, username)
    response = json.dumps(settings_response)
    print(f"Settings response: {settings_response}")

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
    channel.queue_declare(queue='settings_queue')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='settings_queue', on_message_callback=lambda ch, method, props, body: on_request(ch, method, props, body, db_config))

    print(" [x] Awaiting settings get requests")
    channel.start_consuming()

if __name__ == "__main__":
    main()
