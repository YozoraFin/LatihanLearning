import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import dataset from '../data/dataset.json'; 

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [displayCount, setDisplayCount] = useState(10); 

    const location = useLocation();

    useEffect(() => {
        setProducts(dataset);
        setFilteredProducts(dataset);
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('search') || '';

        if (searchQuery) {
            const filtered = products.filter(product => 
                product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); 
        }

        setDisplayCount(10);
    }, [location.search, products]);

    const displayedProducts = filteredProducts.slice(0, displayCount);

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 10);
    };

    const searchQuery = new URLSearchParams(location.search).get('search') || '';

    return (
        <div className="container px-5 py-3 mt-4 bg-white fyp rounded-2">
            <h1 className="pb-5 text-center">
                {searchQuery ? `Results for: ${searchQuery}` : 'All Products'}
            </h1>
            <div className="gap-5 text-center row justify-content-center align-items-center">
                {displayedProducts.map((product) => (
                    <div key={product.objectID} className="p-3 col-2 box box-product rounded-3">
                        <Link to={`/product/${product.objectID}`} className="text-decoration-none text-dark">
                            <img className="pb-3 box-img" src={product.image} alt={product.name} width={150} height={150} />
                            <p className='text-truncate'>{product.name}</p>
                            <p className='fs-2 fw-bold'>${product.salePrice.toFixed(2)}</p>
                        </Link>
                    </div>
                ))}
            </div>
            {filteredProducts.length > displayCount && (
                <div className="mt-4 text-center">
                    <button className="btn btn-secondary" onClick={handleShowMore}>
                        Show More
                    </button>
                </div>
            )}
            <div className="mt-4 text-center">
                {filteredProducts.length > 0 ? (
                    <p>Showing {displayedProducts.length} of {filteredProducts.length} products</p>
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default Product;