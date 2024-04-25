import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/entenadu/login');
        }
    }, [isLoggedIn, navigate]);

    const handleLogout = () => {

        setIsLoggedIn(false);

        navigate('/entenadu/login');

        if (location.state && location.state.from === '/entenadu/admin') {
            window.history.replaceState(null, '', '/entenadu/login');
        }
    };

    const handleAddReminderClick = () => {
        navigate('/entenadu/reminder');
    };

    const handleRegisterClick = () => {
        navigate('/entenadu/registration');
    };

    return (
        <div className="admin-page-container">
            <h1 className="admin-page-header">Admin Page</h1>
            <div className="admin-page-buttons">
                <button className="admin-page-button" onClick={handleAddReminderClick}>
                    Add Reminder
                </button>
                <button className="admin-page-button" onClick={handleRegisterClick}>
                    Register
                </button>
                <button className="admin-page-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
