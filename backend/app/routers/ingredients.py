from fastapi import APIRouter, HTTPException, Path
from pydantic import BaseModel
from app.rabbitmq.rabbitmq_client import RabbitMQ

router = APIRouter()


@router.get("/api/ingredients/recipe/{recipe_id}")
async def get_trending_recipes(recipe_id: int = Path(..., description="The ID of the recipe to retrieve")):
    rabbitmq_client = RabbitMQ(queue_name='ingredients_recipe_queue')
    response = rabbitmq_client.call({'recipe_id': recipe_id})
    rabbitmq_client.close_connection()
    if response.get("success"):
        return response.get("ingredients", [])
    else:
        raise HTTPException(
            status_code=500, detail="Failed to get trending recipes")
