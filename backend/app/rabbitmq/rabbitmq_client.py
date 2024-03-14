import pika
import uuid
import json

class RabbitMQ:
    def __init__(self, host='localhost', queue_name='default_queue', username='admin', password='IT490'):
        self.queue_name = queue_name
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host=host,
                credentials=pika.PlainCredentials(username, password)
            )
        )
        self.channel = self.connection.channel()

        result = self.channel.queue_declare(queue=queue_name)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True)

        self.response = None
        self.corr_id = None

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = json.loads(body)

    def call(self, message):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(
            exchange='',
            routing_key=self.queue_name,
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=json.dumps(message))

        while self.response is None:
            self.connection.process_data_events()
        return self.response

    def close_connection(self):
        self.connection.close()
