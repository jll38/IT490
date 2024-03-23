from fastapi import APIRouter, HTTPException, Path
from pydantic import BaseModel, EmailStr
from app.rabbitmq.rabbitmq_client import RabbitMQ

router = APIRouter()

class ForumPostCreateRequest(BaseModel):
    title: str
    content: str
    user_id: int

class ForumPostCommentRequest(BaseModel):
    post_id: int
    content: str
    user_id: int

@router.post("/api/forum/add_post")
async def add_forum_post(request: ForumPostCreateRequest):
    rabbitmq_client = RabbitMQ(queue_name='forum_post_add_queue')
    message = {
        'title': request.title,
        'content': request.content,
        'user_id': request.user_id
    }
    response = rabbitmq_client.call(message)
    rabbitmq_client.close_connection()
    if response.get("success"):
        return {"message": "Forum post added successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to add forum post")

@router.get("/api/forum/posts")
async def view_forum_posts():
    rabbitmq_client = RabbitMQ(queue_name='forum_post_view_queue')
    message = {}  
    print(1)
    response = rabbitmq_client.call(message)
    print(2)
    rabbitmq_client.close_connection()
    if response.get("success"):
        return response.get("posts", [])
    else:
        raise HTTPException(status_code=400, detail="Failed to fetch forum posts")

@router.post("/api/forum/comment")
async def comment_on_post(request: ForumPostCommentRequest):
    rabbitmq_client = RabbitMQ(queue_name='forum_post_comment_queue')
    message = {
        'post_id': request.post_id,
        'content': request.content,
        'user_id': request.user_id
    }
    response = rabbitmq_client.call(message)
    rabbitmq_client.close_connection()
    if response.get("success"):
        return {"message": "Comment added successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to add comment")

@router.get("/api/forum/posts/{post_id}")
async def view_forum_post(post_id: int = Path(..., description="The ID of the forum post to retrieve")):
    """
    Fetch a singular forum post based on ID.
    """
    rabbitmq_client = RabbitMQ(queue_name='forum_post_fetch_queue')
    message = {'post_id': post_id}
    print(message)
    response = rabbitmq_client.call(message)
    rabbitmq_client.close_connection()

    if response.get("success"):
        return response.get("post", {})
    else:
        detail = response.get("detail", "Failed to fetch forum post")
        raise HTTPException(status_code=404, detail=detail)