from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models import Product

from app.schemas import ProductCreate, ProductUpdate

from app.utils import generate_product_id

from app.auth import admin_required

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    admin: dict = Depends(admin_required)
):

    new_product = Product(
        product_id=generate_product_id(),
        product_name=product.product_name,
        price=product.price,
        description=product.description,
        image_url=product.image_url,
        category=product.category
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):

    return db.query(Product).all()


@router.delete("/{product_id}")
def delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    admin: dict = Depends(admin_required)
):

    product = db.query(Product).filter(
        Product.product_id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted"
    }
    
@router.put("/{product_id}")
def update_product(
    product_id: str,
    updated_product: ProductUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(admin_required)
):

    product = db.query(Product).filter(
        Product.product_id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.product_name = updated_product.product_name
    product.price = updated_product.price
    product.description = updated_product.description
    product.image_url = updated_product.image_url
    product.category = updated_product.category

    db.commit()
    db.refresh(product)

    return {
        "message": "Product updated successfully",
        "product": product
    }