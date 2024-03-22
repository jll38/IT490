import pika
import json
import mysql.connector
from mysql.connector import Error

def add_forum_post(db_config, title, content, user_id):
    """Insert a new forum post into the database."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        insert_query = "INSERT INTO ForumPosts (title, content, user_id) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (title, content, user_id))
        conn.commit()
        cursor.close()
        conn.close()
        return True
    except Error as e:
        print(f"Database error: {e}")
        return False


def on_forum_post_request(ch, method, props, body, db_config):
    request = json.loads(body)
    title = request['title']
    content = request['content']
    user_id = request['user_id']

    print(f"Received forum post creation request: {title}")
    success = add_forum_post(db_config, title, content, user_id)

    response = json.dumps({'success': success})
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=props.correlation_id),
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

    connection = pika.BlockingConnection(
        pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    queue_name = 'forum_post_queue'
    channel.queue_declare(queue=queue_name)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method,
                          props, body: on_forum_post_request(ch, method, props, body, db_config))

    print(f" [x] Awaiting forum post requests on {queue_name}")
    channel.start_consuming()


if __name__ == "__main__":
    main()
