import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerificationContext } from './reset/VerificationContext';
import './AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdminAuthenticated, authenticateAdmin } = useVerificationContext();
    const [lastPath, setLastPath] = useState('');

    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigate('/entenadu/login');
        }
    }, [isAdminAuthenticated, navigate]);

    useEffect(() => {
        if (lastPath && location.pathname === '/entenadu/login' && lastPath !== location.pathname) {
            authenticateAdmin(false); 
            navigate('/entenadu/login', { replace: true }); 
        }
        setLastPath(location.pathname); 
    }, [location, navigate, authenticateAdmin, lastPath]); 

    const handleLogout = () => {
        authenticateAdmin(false); 
        navigate('/entenadu/login', { replace: true });
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
