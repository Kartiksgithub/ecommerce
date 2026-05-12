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
def update_order(
    order_id: str,
    updated_order: OrderUpdate,
    db: Session = Depends(get_db),
    payload: dict = Depends(verify_token)
):

    order = db.query(Order).filter(
        Order.order_id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    # Check if user is admin or owner of the order
    is_admin = payload.get("role") == "admin"
    is_owner = order.username == payload.get("sub")

    if not is_admin and not is_owner:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to update this order"
        )

    # Update fields
    if updated_order.status is not None:
        order.status = updated_order.status
    if updated_order.quantity is not None:
        order.quantity = updated_order.quantity
        # Recalculate total price
        product = db.query(Product).filter(
            Product.product_id == order.product_id
        ).first()
        if product:
            order.total_price = product.price * updated_order.quantity
    if updated_order.address is not None:
        order.address = updated_order.address
    if updated_order.pincode is not None:
        order.pincode = updated_order.pincode
    if updated_order.state is not None:
        order.state = updated_order.state
    if updated_order.district is not None:
        order.district = updated_order.district
    if updated_order.phone_number is not None:
        order.phone_number = updated_order.phone_number

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
    payload: dict = Depends(verify_token)
):

    order = db.query(Order).filter(
        Order.order_id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    # Check if user is admin or owner of the order
    is_admin = payload.get("role") == "admin"
    is_owner = order.username == payload.get("sub")

    if not is_admin and not is_owner:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to delete this order"
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully"
    }