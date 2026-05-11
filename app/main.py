from fastapi import FastAPI
from app.database import (
    engine,
    Base
)
from app.routers import (
    auth,
    products,
    orders
)
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
def home():

    return {
        "message": "Ecommerce Backend Running"
    }
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)