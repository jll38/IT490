from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.rabbitmq.rabbitmq_client import RabbitMQ

router = APIRouter()

@router.get("/api/recipes/trending")
async def get_trending_recipes():
    rabbitmq_client = RabbitMQ(queue_name='recipes_trending_queue')
    response = rabbitmq_client.call({})
    print(1)
    rabbitmq_client.close_connection()
    print(2)
    if response.get("success"):
        return response.get("recipes", [])
    else:
        raise HTTPException(status_code=500, detail="Failed to get trending recipes")

@router.get("/api/recipes/recent")
async def get_recent_recipes():
    rabbitmq_client = RabbitMQ(queue_name='recipes_recent_queue')
    response = rabbitmq_client.call({})
    rabbitmq_client.close_connection()
    if response.get("success"):
        return response.get("recipes", [])
    else:
        raise HTTPException(status_code=500, detail="Failed to get recent recipes")
