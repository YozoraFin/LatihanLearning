import { useParams } from 'react-router-dom';
import dataset from '../data/dataset.json';
import { useCart } from './cartcontext.jsx'; 
import React, { useState } from 'react';

const ProductDetail = () => {
    const { id } = useParams();
    const product = dataset.find(item => item.objectID === id);
    const { addToCart, cart } = useCart();
    
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleAddToCart = () => {
        const existingProduct = cart.find(item => item.objectID === product.objectID);
        
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            const productWithQuantity = { ...product, quantity };
            addToCart(productWithQuantity);
        }

        alert(`${product.name} (x${quantity}) has been added to your cart!`);
    };


    return (
        <div className="container gap-5 d-flex align-items-center detail">
            <img src={product.image} alt={product.name} width={300} height={300} />
            <div className="gap-1 d-flex flex-column">
                <h1>{product.name}</h1>
                <p>{product.shortDescription}</p>
                <p className='fw-bold'>{product.manufacturer}</p>
                <p className='fs-2 fw-bold'>${product.salePrice.toFixed(2)}</p>
                <div >
                    <div className="d-flex align-items-center">
                        <button 
                            className="text-white bg-secondary btn rounded-start rounded-0" 
                            onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                        >
                            -
                        </button>
                        <button className='border btn rounded-0'>{quantity}</button>
                        <button 
                            className="text-white bg-secondary btn rounded-end rounded-0" 
                            onClick={() => setQuantity(prev => prev + 1)}
                        >
                            +
                        </button>
                    </div>

                </div>
                    <button className="mt-3 btn btn-primary cart-btn" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    </div>
        </div>
    );
};

export default ProductDetail;