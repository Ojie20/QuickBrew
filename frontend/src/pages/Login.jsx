import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({onLogin}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('/login', {username,password});
            localStorage.setItem("token", response.data.token)
            onLogin();
            navigate('/');
        }
        catch(err){
            console.error("Login failed", err);
        }
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container login-container mx-auto w-50 p-4 border rounded text-center">
            <p className="navbar-brand" >
            <img src="public/QuickBrewLogo.svg" alt="Logo" width="90" height="90" className="d-inline-block align-top" />
            </p>
            <h2 className='mb-3'>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-3">
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input
                    className='form-control'
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.trim())}
                        required
                    />
                </div>
                <div className=" mb-3">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input
                    className='form-control'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                        required
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;