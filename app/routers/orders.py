from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import (
    Order,
    Product
)
from app.schemas import (
    OrderCreate,
    OrderUpdate
)
from app.auth import (
    verify_token,
    admin_required
)
from app.utils import generate_order_id

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    payload: dict = Depends(verify_token)
):

    product = db.query(Product).filter(
        Product.product_id == order.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
        
    total_price = product.price * order.quantity

    new_order = Order(
        order_id=generate_order_id(),
        username=payload.get("sub"),
        product_id=product.product_id,
        product_name=product.product_name,
        quantity=order.quantity,
        total_price=total_price,
        status="Pending",
        address = order.address,
        pincode = order.pincode,
        state = order.state,
        district = order.district,
        phone_number=order.phone_number,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order


@router.get("/my-orders")
def get_my_orders(
    db: Session = Depends(get_db),
    payload: dict = Depends(verify_token)
):

    return db.query(Order).filter(
        Order.username == payload.get("sub")
    ).all()


@router.get("/")
def get_all_orders(
    db: Session = Depends(get_db),
    admin: dict = Depends(admin_required)
):

    return db.query(Order).all()


@router.put("/{order_id}")
def update_order_status(
    order_id: str,
    updated_order: OrderUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(admin_required)
):

    order = db.query(Order).filter(
        Order.order_id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order.status = updated_order.status
    db.commit()
    db.refresh(order)

    return {
        "message": "Order updated successfully",
        "order": order
    }
    
@router.delete("/{order_id}")
def delete_order(
    order_id: str,
    db: Session = Depends(get_db),
    admin: dict = Depends(admin_required)
):

    order = db.query(Order).filter(
        Order.order_id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted"
    }