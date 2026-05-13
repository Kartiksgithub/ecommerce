from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    DateTime,
    BigInteger,
    JSON
)

from datetime import datetime

from app.database import Base


class Account(Base):

    __tablename__ = "accounts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    phone_number = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    role = Column(
        String,
        nullable=False
    )


class Product(Base):

    __tablename__ = "products"
    product_id = Column(
        String,
        primary_key=True,
        index=True
    )
    product_name = Column(String)
    price = Column(Float)
    description = Column(String)
    image_urls = Column(JSON, default=[])
    category = Column(String)
    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )
    
class Order(Base):

    __tablename__ = "orders"

    order_id = Column(
        String,
        primary_key=True,
        index=True
    )
    username = Column(String)
    product_id = Column(String)
    product_name = Column(String)
    quantity = Column(Integer)
    total_price = Column(Float)
    status = Column(String, default="Pending")
    address = Column(String)
    pincode = Column(Integer)
    state = Column(String)
    district = Column(String)
    phone_number = Column(BigInteger)
    notes = Column(String)
    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )
    