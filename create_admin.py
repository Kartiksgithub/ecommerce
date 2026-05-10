from app.database import SessionLocal

from app.models import Account

from app.utils import hash_password

db = SessionLocal()

admin = Account(
    username="admin",
    email="admin@gmail.com",
    phone_number="9999999999",
    password=hash_password("admin123"),
    role="admin"
)

db.add(admin)

db.commit()

print("Admin Created")