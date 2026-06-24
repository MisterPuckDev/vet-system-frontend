import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl font-bold text-red-600">403 - Access Denied</h1>
            <p className="mt-2 text-gray-600">You do not have the required permissions to view this section.</p>
            <button
                onClick={() => navigate('/login')}
                className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition-colors"
            >
                Return to Login
            </button>
        </div>
    );
};

export default Unauthorized;