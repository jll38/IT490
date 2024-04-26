import pika
import json
import mysql.connector
from mysql.connector import Error
from datetime import datetime
import os
from dotenv import load_dotenv
import decimal


def fetch_forum_posts(db_config, user_id : int):
    """Retrieve forum posts from the database, including the username of the poster."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT
        fp.post_id,
        fp.user_id,
        fp.title,
        fp.content,
        fp.created_at,
        u.username AS author,
        SUM(CASE WHEN fv.vote = 1 THEN 1 ELSE 0 END) AS upvotes,
        SUM(CASE WHEN fv.vote = -1 THEN 1 ELSE 0 END) AS downvotes,
        (
            SELECT vote
            FROM Forum_Votes
            WHERE user_id = %s
            AND post_id = fp.post_id
            LIMIT 1
        ) AS current_user_vote
        FROM Forum_Posts fp
        JOIN Users u ON fp.user_id = u.user_id
        LEFT JOIN Forum_Votes fv ON fp.post_id = fv.post_id
        GROUP BY fp.post_id, fp.user_id, fp.title, fp.content, fp.created_at, u.username
        ORDER BY fp.created_at DESC;
        """
        cursor.execute(query, (user_id,))
        posts = cursor.fetchall()
        cursor.close()
        conn.close()
        return posts
    except Error as e:
        print(f"Database error: {e}")
        return []


class DateTimeEncoder(json.JSONEncoder):
    """Custom encoder for datetime and decimal objects."""

    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        elif isinstance(o, decimal.Decimal):
            return float(o)
        return super().default(o)


def on_forum_post_select_request(ch, method, props, body, db_config):
    print("Received request for forum posts")
    request = json.loads(body)
    user_id = request['user_id']
    posts = fetch_forum_posts(db_config, user_id)
    response = json.dumps(
        {'success': True, 'posts': posts}, cls=DateTimeEncoder)
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
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

    connection = pika.BlockingConnection(
        pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    queue_name = 'forum_post_view_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method,
                          props, body: on_forum_post_select_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests for forum posts on {queue_name}")
    channel.start_consuming()


if __name__ == "__main__":
    main()
