import React from 'react';
import { useCart } from './cartcontext.jsx'; 
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        alert('Proceeding to checkout! Thank your for your hospitality');
        clearCart(); 
    };

    return (
        <div className="container mt-4">
            <h1 className='mb-5'>Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul className="list-group">
                        {cart.map((product, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between w-100">
                                    <div>
                                        <img src={product.image} alt={product.name} width={50} height={50} className="me-3" />
                                        {product.name} - ${product.salePrice.toFixed(2)}
                                    </div>
                                    <div className="fw-bold fs-4 d-flex align-items-center">x{product.quantity}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-3 btn btn-success" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;