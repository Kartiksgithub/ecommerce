from fastapi import FastAPI

from app.database import (
    engine,
    Base
)

from app.routers import (
    auth,
    products
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)

app.include_router(products.router)


@app.get("/")
def home():

    return {
        "message": "Ecommerce Backend Running"
    }