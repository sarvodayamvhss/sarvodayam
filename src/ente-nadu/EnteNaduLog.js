import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerificationContext } from './reset/VerificationContext'; 
import './Login.css';

const EnteNaduLog = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    

    const { authenticateAdmin } = useVerificationContext(); 
    useEffect(() => {
        authenticateAdmin(false);
    }, [authenticateAdmin]);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === 'admin' && password === 'admin') {
            authenticateAdmin(true); 
            navigate('/entenadu/admin');
            setUsername('');
            setPassword('');
            

        } else {
            alert('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-header">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-login">
                    Login
                </button>
            </form>
        </div>
    );
};

export default EnteNaduLog;
