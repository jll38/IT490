import pika
import json
import mysql.connector
from mysql.connector import Error
import datetime


def insert_forum_post(db_config, post_data):
    """Insert a new forum post into the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = "INSERT INTO Forum_Posts (user_id, title, content, created_at) VALUES (%s, %s, %s, %s)"
        cursor.execute(
            query, (post_data['user_id'], post_data['title'], post_data['content'], datetime.datetime.now().isoformat()))
        post_id = cursor.lastrowid
        conn.commit()
        cursor.close()
        conn.close()
        return post_id
    except Error as e:
        print(f"Database error: {e}")
        return None


def on_forum_post_create_request(ch, method, props, body, db_config):
    print("Received request to create forum post")

    post_data = json.loads(body)
    post_id = insert_forum_post(db_config, post_data)

    response = {'success': True, 'post_id': post_id} if post_id else {
        'success': False}
    response_body = json.dumps(response)

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
                     body=response_body)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    db_config = {
        'host': 'localhost',
        'port': 3306,
        'user': 'admin',
        'password': 'password',
        'database': 'recipe_app'
    }

    connection = pika.BlockingConnection(
        pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    queue_name = 'forum_post_create_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method,
                          props, body: on_forum_post_create_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting requests to create forum posts on {queue_name}")
    channel.start_consuming()


if __name__ == "__main__":
    main()
