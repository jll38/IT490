from fastapi import APIRouter, HTTPException, Path
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

@router.get("/api/recipes/{recipe_id}")
async def get_recipe(recipe_id: int = Path(..., description="The ID of the recipe to retrieve")):
    rabbitmq_client = RabbitMQ(queue_name='recipe_fetch_queue')
    message = {'recipe_id': recipe_id}
    response = rabbitmq_client.call(message)
    rabbitmq_client.close_connection()
    if response.get("success"):
        return response.get("recipe")
    else:
        raise HTTPException(status_code=500, detail="Failed to get the recipe")
    
class CreateRatingRequest(BaseModel):
    recipe_id: int
    user_id: int
    rating: int

@router.post("/api/recipes/set-rating")
async def setRating(request: CreateRatingRequest):
    rabbitmq_client = RabbitMQ(queue_name='recipe_rating_queue')
    message = {'recipe_id': request.recipe_id, 'user_id': request.user_id, 'rating': request.rating}
    response = rabbitmq_client.call(message)
    rabbitmq_client.close_connection()
    if response.get("success"):
        return response.get("recipe")
    else:
        raise HTTPException(status_code=500, detail="Failed to get the recipe")
