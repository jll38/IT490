import pika
import json
import mysql.connector
from mysql.connector import Error

# Database configuration
db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'admin',
    'password': 'password',
    'database': 'recipe_app'
}

# Establish connection to RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Ensure the queue exists
channel.queue_declare(queue='register_queue')

def user_exists(username, email):
    """Check if a user already exists in the database by username or email."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user WHERE name = %s OR email = %s", (username, email))
        user_record = cursor.fetchone()
        cursor.close()
        conn.close()
        return user_record is not None
    except Error as e:
        print(f"Database error: {e}")
        return False  # Assume existence on error to prevent duplicate attempts

def register_user(username, email, password):
    """Insert a new user into the database."""
    if user_exists(username, email):
        return False  # User already exists
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO user (name, email, password) VALUES (%s, %s, %s)", (username, email, password))
        conn.commit()
        cursor.close()
        conn.close()
        return True
    except Error as e:
        print(f"Database error during registration: {e}")
        return False

def on_request(ch, method, props, body):
    request = json.loads(body)
    username = request['username']
    email = request['email']
    password = request['password']  # In a real application, ensure the password is hashed

    print(f"Received registration request for {username}")
    # Register user
    registration_success = register_user(username, email, password)

    response = json.dumps({'success': registration_success})
    # Send response back to the callback queue
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='register_queue', on_message_callback=on_request)

print(" [x] Awaiting registration requests")
channel.start_consuming()
