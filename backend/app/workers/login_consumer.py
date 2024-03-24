import pika
import json
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

def validate_user_credentials(db_config, username, password):
    """Validate login credentials against the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT password FROM Users WHERE name = %s", (username,))
        user_record = cursor.fetchone()
        print(user_record)
        cursor.close()
        conn.close()
        if user_record and user_record['password'] == password:  # Consider using hashed passwords in production
            return True
    except Error as e:
        print(f"Database error: {e}")
    return False

def on_request(ch, method, props, body, db_config):
    request = json.loads(body)
    username = request['username']
    password = request['password']

    print(f"Received login request for {username}")
    # Validate credentials
    login_success = validate_user_credentials(db_config, username, password)
    
    response = json.dumps({'success': login_success})
    # Send response back to the callback queue
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)

def main():
    load_dotenv()
    # Database configuration
    db_config = {
        'host': os.getenv('DATABASE_HOST'),
        'port': 3306,
        'user': os.getenv('DATABASE_USER'),
        'password': os.getenv('DATABASE_PASSWORD'),
        'database': os.getenv('DATABASE')
    }

    # Establish connection to RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters(os.getenv('RABBITMQ_HOST')))
    channel = connection.channel()

    # Ensure the queue exists
    channel.queue_declare(queue='login_queue')

    channel.basic_qos(prefetch_count=1)
    
    channel.basic_consume(queue='login_queue', on_message_callback=lambda ch, method, props, body: on_request(ch, method, props, body, db_config))

    print(" [x] Awaiting login requests")
    channel.start_consuming()

if __name__ == "__main__":
    main()
