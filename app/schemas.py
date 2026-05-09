from pydantic import BaseModel
from datetime import datetime


class ProductCreate(BaseModel):
    product_name: str
    price: float
    description: str
    image_url: str
    category: str
    
    
class ProductUpdate(BaseModel):
    product_name: str
    price: float
    description: str
    image_url: str
    category: str


class ProductResponse(ProductCreate):
    product_id: str
    timestamp: datetime
    
    class Config:
        from_attributes = True
        