import threading
import login_consumer  
import register_consumer

def start_login_consumer():
    print("Starting login consumer...")
    login_consumer.main()

def start_register_consumer():
    print("Starting register consumer...")
    register_consumer.main()

if __name__ == "__main__":
    login_thread = threading.Thread(target=start_login_consumer)
    register_thread = threading.Thread(target=start_register_consumer)

    login_thread.start()
    register_thread.start()

    login_thread.join()
    register_thread.join()
