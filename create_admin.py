from app.database import SessionLocal

from app.models import Account

from app.utils import hash_password

db = SessionLocal()

admin = Account(
    username="admin",
    password=hash_password("admin123"),
    role="admin"
)

user = Account(
    username="kartik",
    password=hash_password("user123"),
    role="user"
)

db.add(admin)

db.add(user)

db.commit()

print("Accounts Created")