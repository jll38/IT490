import pika
import json
import mysql.connector
from mysql.connector import Error

# Database configuration
db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'password',
    'database': 'recipe_app'
}

# Establish connection to RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Ensure the queue exists
channel.queue_declare(queue='login_queue')

def validate_user_credentials(username, password):
    """Validate login credentials against the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
        user_record = cursor.fetchone()
        cursor.close()
        conn.close()
        if user_record and user_record['password'] == password:  # Consider using hashed passwords in production
            return True
    except Error as e:
        print(f"Database error: {e}")
    return False

def on_request(ch, method, props, body):
    request = json.loads(body)
    username = request['username']
    password = request['password']

    print(f"Received login request for {username}")
    # Validate credentials
    login_success = validate_user_credentials(username, password)

    response = json.dumps({'success': login_success})
    # Send response back to the callback queue
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='login_queue', on_message_callback=on_request)

print(" [x] Awaiting login requests")
channel.start_consuming()
