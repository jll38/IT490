import pika
import json
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
import bcrypt  # Import bcrypt for hashing and salting passwords

def user_exists(db_config, username, email):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Users WHERE username = %s OR email = %s", (username, email))
        user_record = cursor.fetchone()
        cursor.close()
        conn.close()
        return user_record is not None
    except Error as e:
        print(f"Database error: {e}")
        return False

def register_user(db_config, username, email, password):
    """Insert a new user into the database."""
    if user_exists(db_config, username, email):
        return False  # User already exists
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        salt = bcrypt.gensalt()
        # Hash and salt the password
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

        cursor.execute("INSERT INTO user (username, email, password_hash, salt) VALUES (%s, %s, %s, %s)",
                       (username, email, password_hash, salt))
        conn.commit()
        cursor.close()
        conn.close()
        return True
    except Error as e:
        print(f"Database error during registration: {e}")
        return False

def on_request(ch, method, props, body, db_config):
    request = json.loads(body)
    username = request['username']
    email = request['email']
    password = request['password'] 

    print(f"Received registration request for {username}")

    registration_success = register_user(db_config, username, email, password)

    response = json.dumps({'success': registration_success})
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
    channel.queue_declare(queue='register_queue')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='register_queue', on_message_callback=lambda ch, method, props, body: on_request(ch, method, props, body, db_config))

    print(" [x] Awaiting registration requests")
    channel.start_consuming()

if __name__ == "__main__":
    main()
