import pika
import json
import mysql.connector
from mysql.connector import Error
import datetime
import os
from dotenv import load_dotenv


def insert_forum_comment(db_config, comment_data):
    """Insert a new forum comment into the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = "INSERT INTO Forum_Comments (post_id, user_id, content, created_at) VALUES (%s, %s, %s, %s)"
        cursor.execute(
            query, (comment_data['post_id'], comment_data['user_id'], comment_data['content'], datetime.datetime.now().isoformat()))
        comment_id = cursor.lastrowid
        conn.commit()
        cursor.close()
        conn.close()
        return comment_id
    except Error as e:
        print(f"Database error: {e}")
        return None


def on_forum_comment_create_request(ch, method, props, body, db_config):
    print("Received request to create forum comment")
    comment_data = json.loads(body)
    comment_id = insert_forum_comment(db_config, comment_data)
    response = {'success': True, 'comment_id': comment_id} if comment_id else {
        'success': False}
    response_body = json.dumps(response)
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
                     body=response_body)
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
    queue_name = 'forum_comment_create_queue'
    channel.queue_declare(queue=queue_name)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method,
                          props, body: on_forum_comment_create_request(ch, method, props, body, db_config))
    print(f" [x] Awaiting requests to create forum comments on {queue_name}")
    channel.start_consuming()


if __name__ == "__main__":
    main()
