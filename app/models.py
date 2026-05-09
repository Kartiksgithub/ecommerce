from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    DateTime
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
        unique=True
    )

    password = Column(String)

    role = Column(String)


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

    image_url = Column(String)

    category = Column(String)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )