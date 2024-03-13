from fastapi import APIRouter
from app.rabbitmq.rabbitmq_client import RabbitMQ
from pydantic import BaseModel



router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/api/login")
async def login(request: LoginRequest):
    rabbitmq_client = RabbitMQ(queue_name='login_queue')
    response = rabbitmq_client.call({'username': request.username, 'password': request.password})
    rabbitmq_client.close_connection()

    if response["success"]:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=400, detail="Login failed")

