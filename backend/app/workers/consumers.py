import threading
import login_consumer
import register_consumer
from forum import new_post_consumer, fetch_forum_posts


def start_login_consumer():
    print("Starting login consumer...")
    login_consumer.main()


def start_register_consumer():
    print("Starting register consumer...")
    register_consumer.main()


def start_forum_post_consumer():
    print("Starting new forum post consumer...")
    new_post_consumer.main()

def view_forum_post_consumer():
    print("Starting view forum post consumer...")
    fetch_forum_posts.main()



if __name__ == "__main__":
    login_thread = threading.Thread(target=start_login_consumer)
    register_thread = threading.Thread(target=start_register_consumer)
    new_forum_post_thread = threading.Thread(target=start_forum_post_consumer)
    view_forum_post_thread = threading.Thread(target=view_forum_post_consumer)

    login_thread.start()
    register_thread.start()
    new_forum_post_thread.start()
    view_forum_post_thread.start()

    login_thread.join()
    register_thread.join()
    new_forum_post_thread.join()
    view_forum_post_thread.join()
