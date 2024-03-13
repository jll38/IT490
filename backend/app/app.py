from fastapi import FastAPI
from .routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add this before adding any routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message": "Hello, world!"}
