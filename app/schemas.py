from pydantic import BaseModel, EmailStr
from datetime import datetime

class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    phone_number: str
    password: str

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
        
class OrderCreate(BaseModel):
    product_id: str
    quantity: int
    address: str
    pincode: int
    state: str
    district: str

class OrderUpdate(BaseModel):
    status: str