import pika
import json
import mysql.connector
from mysql.connector import Error
from datetime import datetime


def fetch_forum_posts(db_config):
    """Retrieve forum posts from the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM Forum_Posts"
        cursor.execute(query)
        posts = cursor.fetchall()
        cursor.close()
        conn.close()
        return posts
    except Error as e:
        print(f"Database error: {e}")
        return []

class DateTimeEncoder(json.JSONEncoder):
    """Custom encoder for datetime objects."""
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)

def on_forum_post_select_request(ch, method, props, body, db_config):
    print("Received request for forum posts")
    
    posts = fetch_forum_posts(db_config)
    
    response = json.dumps({'success': True, 'posts': posts}, cls=DateTimeEncoder)
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id=props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag=method.delivery_tag)

def main():
    db_config = {
        'host': 'localhost',
        'port': 3306,
        'user': 'admin',
        'password': 'password',
        'database': 'recipe_app'
    }

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    queue_name = 'forum_post_view_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, props, body: on_forum_post_select_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests for forum posts on {queue_name}")
    channel.start_consuming()

if __name__ == "__main__":
    main()
