from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from fastapi.security import (
    OAuth2PasswordRequestForm
)
from app.schemas import RegisterSchema

from app.utils import (
    verify_password,
    hash_password
)
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Account
from app.auth import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register_user(
    user: RegisterSchema,
    db: Session = Depends(get_db)
):

    existing_username = db.query(Account).filter(
        Account.username == user.username
    ).first()

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    existing_email = db.query(Account).filter(
        Account.email == user.email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    existing_phone = db.query(Account).filter(
        Account.phone_number == user.phone_number
    ).first()

    if existing_phone:
        raise HTTPException(
            status_code=400,
            detail="Phone number already exists"
        )

    new_user = Account(
        username=user.username,
        email=user.email,
        phone_number=user.phone_number,
        # password=hash_password(user.password),
        password=user.password,
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    account = db.query(Account).filter(
        Account.username == form_data.username
    ).first()

    if not account:

        raise HTTPException(
            status_code=401,
            detail="Invalid username"
        )

    if not verify_password(
        form_data.password,
        account.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token(
        {
            "sub": account.username,
            "role": account.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": account.role
    }