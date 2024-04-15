import pika
import json
import mysql.connector
from mysql.connector import Error
import datetime
import os
from dotenv import load_dotenv

def handle_vote(db_config, vote_data):
    """Handle voting on a forum post, including checking for existing votes."""
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        # Check if a vote by this user on this post already exists
        select_query = "SELECT vote FROM Forum_Votes WHERE user_id = %s AND post_id = %s"
        cursor.execute(select_query, (vote_data['user_id'], vote_data['post_id']))
        current_vote = cursor.fetchone()
        
        # Decide the action based on the existing vote and the new vote
        if current_vote:
            if vote_data['vote'] == 0:  # Remove the vote
                delete_query = "DELETE FROM Forum_Votes WHERE user_id = %s AND post_id = %s"
                cursor.execute(delete_query, (vote_data['user_id'], vote_data['post_id']))
            else:  # Update the vote
                update_query = "UPDATE Forum_Votes SET vote = %s, created_at = %s WHERE user_id = %s AND post_id = %s"
                cursor.execute(update_query, (vote_data['vote'], datetime.datetime.now().isoformat(), vote_data['user_id'], vote_data['post_id']))
        else:
            if vote_data['vote'] != 0:  # Insert the new vote if not zero
                insert_query = "INSERT INTO Forum_Votes (user_id, post_id, vote, created_at) VALUES (%s, %s, %s, %s)"
                cursor.execute(insert_query, (vote_data['user_id'], vote_data['post_id'], vote_data['vote'], datetime.datetime.now().isoformat()))
        
        conn.commit()
        cursor.close()
        conn.close()
        return cursor.lastrowid if cursor.lastrowid else True
    except Error as e:
        print(f"Database error: {e}")
        return None

def on_forum_post_create_request(ch, method, props, body, db_config):
    print("Received request to vote on forum post")
    vote_data = json.loads(body)
    result = handle_vote(db_config, vote_data)
    
    response = {'success': result is not None, 'vote_id': result if result else None}
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
    
    queue_name = 'forum_vote_queue'
    channel.queue_declare(queue=queue_name)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, props, body: on_forum_post_create_request(ch, method, props, body, db_config))
    
    print(f" [x] Awaiting requests for votes on {queue_name}")
    channel.start_consuming()

if __name__ == "__main__":
    main()
