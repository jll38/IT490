import pika
import json
import mysql.connector
from mysql.connector import Error
from datetime import datetime

import os
from dotenv import load_dotenv

def fetch_forum_post_by_id(db_config, post_id):
    """Retrieve a single forum post from the database by its ID, including the author's username."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT fp.post_id, fp.title, fp.content, fp.created_at, u.username as author
        FROM Forum_Posts fp
        JOIN Users u ON fp.user_id = u.user_id
        WHERE fp.post_id = %s
        """
        cursor.execute(query, (post_id,))
        post = cursor.fetchone()
        cursor.close()
        conn.close()
        return post
    except Error as e:
        print(f"Database error: {e}")
        return None

class DateTimeEncoder(json.JSONEncoder):
    """Custom encoder for datetime objects."""
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)

def on_forum_post_fetch_request(ch, method, props, body, db_config):
    print("Received request for a forum post")

    # Parse the incoming message to get the post ID
    message = json.loads(body)
    post_id = message.get('post_id')
    
    if post_id is not None:
        post = fetch_forum_post_by_id(db_config, post_id)
        if post:
            response = json.dumps({'success': True, 'post': post}, cls=DateTimeEncoder)
        else:
            response = json.dumps({'success': False, 'message': 'Post not found'})
    else:
        response = json.dumps({'success': False, 'message': 'No post ID provided'})
    
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

    connection = pika.BlockingConnection(pika.ConnectionParameters(os.getenv('RABBITMQ_HOST')))
    channel = connection.channel()

    queue_name = 'forum_post_fetch_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, props, body: on_forum_post_fetch_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests for forum posts on {queue_name}")
    channel.start_consuming()

if __name__ == "__main__":
    main()
