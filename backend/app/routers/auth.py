from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.rabbitmq.rabbitmq_client import RabbitMQ
from typing import List

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

class OnboardingRequest(BaseModel):
    username: str
    restrictions: List[str]
    tdee: int

@router.post("/api/auth/register/onboarding")
async def onboarding(request: OnboardingRequest):
    print(request)
    if not request.username:
        raise HTTPException(status_code=400, detail="Username is required.")

    rabbitmq_client = RabbitMQ(queue_name='onboarding_queue')
    
    message = {
        'username': request.username,
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

@router.get("/api/auth/user-settings/{username}")
async def get_user_settings(username):
    rabbitmq_client = RabbitMQ(queue_name='settings_queue')
    response = rabbitmq_client.call({'username': username})
    rabbitmq_client.close_connection()

    print(f"Response from RabbitMQ: {response}")

    if response.get('success', False):
        return response
    else:
        raise HTTPException(status_code=400, detail="Failed Retrieving Settings")
        
@router.put("/api/auth/user-settings/")
async def get_user_settings(request: OnboardingRequest):
    rabbitmq_client = RabbitMQ(queue_name='onboarding_queue')
    response = rabbitmq_client.call({'username': request.username, 'restrictions': request.restrictions, 'tdee': request.tdee, 'method': 'PUT'})
    rabbitmq_client.close_connection()
    print(response)
    if response["success"]:
        return response
    else:
        raise HTTPException(status_code=400, detail="Failed Retrieving Settings")
    
