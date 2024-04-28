import pika
import json
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
import jwt
import bcrypt
from datetime import datetime, timedelta


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)  # Token expires in 15 minutes
    to_encode.update({"exp": expire})
    SECRET_KEY = os.getenv("SECRET_KEY")
    # Debug print to check the type and value of SECRET_KEY
    print(f"Secret Key Type: {type(SECRET_KEY)}, Value: {SECRET_KEY}")
    encoded_jwt = jwt.encode(to_encode, str(SECRET_KEY), algorithm="HS256")
    return encoded_jwt


def validate_user_credentials(db_config, username, password):
    """Validate login credentials against the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT password_hash FROM Users WHERE username = %s", (username,))
        user_record = cursor.fetchone()
        cursor.close()
        conn.close()
        print("Checking hash...")
        return bcrypt.checkpw(password.encode('utf-8'), user_record['password_hash'].encode('utf-8'))
    except Error as e:
        print(f"Database error: {e}")
    return False


def get_user_info(db_config, username):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT user_id, email, dietary_restrictions FROM Users WHERE username = %s", (username,))
        user_record = cursor.fetchone()
        cursor.close()
        conn.close()

        if user_record:
            return {
                'username': username,
                'user_id': user_record['user_id'],
                'email': user_record['email'],
                'dietary_restrictions': str(user_record['dietary_restrictions']).strip('[]').replace("'", "").split(', ')
            }
        else:
            # User not found, return an empty dictionary or raise an exception
            return {}

    except Error as e:
        print(f"Database error: {e}")


def on_request(ch, method, props, body, db_config):
    request = json.loads(body)
    username = request['username']
    password = request['password']

    print(f"Received login request for {username}")
    # Validate credentials
    login_success = validate_user_credentials(db_config, username, password)
    token = create_access_token(get_user_info(db_config, username))
    response = json.dumps(
        {'success': login_success, 'token': token})
    # Send response back to the callback queue
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
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
    connection = pika.BlockingConnection(
        pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Ensure the queue exists
    channel.queue_declare(queue='login_queue')

    channel.basic_qos(prefetch_count=1)

    channel.basic_consume(queue='login_queue', on_message_callback=lambda ch,
                          method, props, body: on_request(ch, method, props, body, db_config))

    print(" [x] Awaiting login requests")
    channel.start_consuming()


if __name__ == "__main__":
    main()
