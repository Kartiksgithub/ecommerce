from pydantic import BaseModel, EmailStr, field_validator
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
    image_urls: list[str]
    category: str
    
    @field_validator('image_urls')
    @classmethod
    def validate_image_urls(cls, v):
        if not v or len(v) == 0:
            raise ValueError('At least one image URL is required')
        return v
    
    
class ProductUpdate(BaseModel):
    product_name: str
    price: float
    description: str
    image_urls: list[str]
    category: str
    
    @field_validator('image_urls')
    @classmethod
    def validate_image_urls(cls, v):
        if not v or len(v) == 0:
            raise ValueError('At least one image URL is required')
        return v


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
    phone_number: int

class OrderUpdate(BaseModel):
    status: str | None = None
    quantity: int | None = None
    address: str | None = None
    pincode: int | None = None
    state: str | None = None
    district: str | None = None
    phone_number: int | None = None