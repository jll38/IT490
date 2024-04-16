from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.rabbitmq.rabbitmq_client import RabbitMQ

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

@router.post("/api/auth/register")
async def register(request: RegisterRequest):
    print("Registering...")
    rabbitmq_client = RabbitMQ(queue_name='register_queue')
    
    message = {
        'username': request.username,
        'email': request.email,
        'password': request.password
    }
    response = rabbitmq_client.call(message)
    
    rabbitmq_client.close_connection()
    
    if response.get("success"):
        return {"message": "Registration successful. Please check your email to verify your account."}
    else:
        raise HTTPException(status_code=400, detail="Registration failed")

@router.post("/api/auth/register")
async def onboarding(request):
    rabbitmq_client = RabbitMQ(queue_name='register_onboarding_queue')
    
    message = {
        'restrictions': request.restrictions,
        'tdee': request.tdee
    }

    response = rabbitmq_client.call(message)
    rabbitmq_client.close_connection()
    
    if response.get("success"):
        return {"message": "Onboarding successful."}
    else:
        raise HTTPException(status_code=400, detail="Onboarding failed, please try again later.")

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/api/auth/login")
async def login(request: LoginRequest):
    rabbitmq_client = RabbitMQ(queue_name='login_queue')
    response = rabbitmq_client.call({'username': request.username, 'password': request.password})
    rabbitmq_client.close_connection()
    print(response)
    if response["success"]:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=400, detail="Login failed")

