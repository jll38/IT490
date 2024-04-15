import threading
import login_consumer
import register_consumer
from forum import new_post_consumer, fetch_forum_posts, fetch_single_forum_post, create_forum_post, vote_forum_post
from recipes import recipe_home_consumer, recipe_page_consumer, recipe_rating_consumer
from ingredients import ingredients_recipe_consumer


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
    print("Starting view forum posts consumer...")
    fetch_forum_posts.main()


def view_single_forum_post_consumer():
    print("Starting view single forum post consumer...")
    fetch_single_forum_post.main()


def create_forum_post_consumer():
    print("Starting create forum post consumer...")
    create_forum_post.main()


def recipe_homepage_consumer():
    print("Starting recipe home page consumer...")
    recipe_home_consumer.main()


def recipe_page():
    print("Starting recipe page consumer...")
    recipe_page_consumer.main()


def recipe_rating():
    print("Starting recipe rating consumer...")
    recipe_rating_consumer.main()


def ingredients_recipe():
    print("Starting ingredients recipe consumer...")
    ingredients_recipe_consumer.main()


def votes_post():
    print("Starting votes post consumer...")
    vote_forum_post.main()


if __name__ == "__main__":
    login_thread = threading.Thread(target=start_login_consumer)
    register_thread = threading.Thread(target=start_register_consumer)
    new_forum_post_thread = threading.Thread(target=start_forum_post_consumer)
    view_forum_post_thread = threading.Thread(target=view_forum_post_consumer)
    view_single_forum_post_thread = threading.Thread(
        target=view_single_forum_post_consumer)
    create_forum_post_thread = threading.Thread(
        target=create_forum_post_consumer)
    recipe_home_thread = threading.Thread(target=recipe_homepage_consumer)
    recipe_page_thread = threading.Thread(target=recipe_page)
    recipe_rating_thread = threading.Thread(target=recipe_rating)
    ingredients_recipe_thread = threading.Thread(target=ingredients_recipe)
    vote_forum_post_thread = threading.Thread(target=votes_post)

    login_thread.start()
    register_thread.start()
    new_forum_post_thread.start()
    view_forum_post_thread.start()
    view_single_forum_post_thread.start()
    create_forum_post_thread.start()
    recipe_home_thread.start()
    recipe_page_thread.start()
    recipe_rating_thread.start()
    ingredients_recipe_thread.start()
    vote_forum_post_thread.start()

    login_thread.join()
    register_thread.join()
    new_forum_post_thread.join()
    view_forum_post_thread.join()
    view_single_forum_post_thread.join()
    create_forum_post_thread.join()
    recipe_home_thread.join()
    recipe_page_thread.join()
    recipe_rating_thread.join()
    ingredients_recipe_thread.join()
    vote_forum_post_thread.join()
