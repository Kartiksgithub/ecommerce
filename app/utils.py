from passlib.context import CryptContext
from datetime import datetime

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(
    plain_password,
    hashed_password
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def generate_product_id():
    now = datetime.now()

    return (
        "pid"
        + now.strftime("%d%m%y%H%M%S")
    )