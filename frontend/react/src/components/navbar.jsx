import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ username, onLogout }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/product?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <nav className="p-4 bg-white navbar navbar-expand-lg row sticky-top">
            <div className="col-4 navbar-brand">
                <Link to='/'>
                    <img className="black" src="assets/logo.png" width={100} alt="Logo" />
                </Link>
            </div>
            <div className="d-flex col-4 search rounded-5">
                <form className="gap-3 p-3 d-flex align-items-center w-max" onSubmit={handleSearchSubmit}>
                    <span className="search-icon material-icons">search</span>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search"
                    />
                </form>
            </div>
            <div className="gap-4 pe-4 d-flex col-4 justify-content-end">
                <button 
                    className="bg-white rounded-5 d-flex btn align-self-center" 
                    onClick={handleCartClick}
                >
                    <span className="material-icons">shopping_cart</span>
                </button>
                {username ? (
                    <div className="bg-white rounded-4 btn fs-5" onClick={handleLogout}>
                        Logout
                    </div>
                ) : (
                    <Link to='/login'>
                        <div className="bg-white rounded-4 btn fs-5">Login</div>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;