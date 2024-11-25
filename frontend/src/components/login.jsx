import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username) {
            onLogin(username);
            navigate('/');
        }
    };

    return (
        <div className='background-login'>
            <div className="container text-center login-container">
                <div className="mt-5 justify-content-center login-page d-flex">
                    <div className="p-5 bg-white login rounded-4">
                        <h1 className="p-3">Login</h1>
                        <div className="gap-3 p-3 username d-flex align-items-center">
                            <span className="material-icons">account_circle</span>
                            <input
                                type="text"
                                placeholder="Username"
                                className="p-2 rounded-3 login-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="gap-3 p-3 pass d-flex align-items-center">
                            <span className="material-icons">lock</span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-2 rounded-3 login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="p-3 px-5 mt-5 login-btn rounded-3" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;