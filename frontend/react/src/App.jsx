import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home.jsx';
import Product from './components/product.jsx';
import Login from './components/login.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Detail from './components/details.jsx';
import Cart from './components/cart.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
        setUsername(username);
    };

    const handleLogout = () => {
        setUsername('');
    };

    return (
            <div id="root">
                <Navbar username={username} onLogout={handleLogout} />
                <main>
                    <Routes>
                        <Route exact path='/' element={username ? <Home username={username} /> : <Navigate to="/login" />} />
                        <Route path='/product' element={<Product />} />
                        <Route path="/cart" element={<Cart />} /> 
                        <Route path='/product/:id' element={<Detail />} />
                        <Route path='/login' element={<Login onLogin={handleLogin} />} />
                    </Routes>
                </main>
                <Footer />
            </div>
    );
}

export default App;