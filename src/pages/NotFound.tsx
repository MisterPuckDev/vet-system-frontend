// src/pages/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
                <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
                <p className="text-gray-600 mb-8">
                    La dirección que ingresaste no corresponde a ninguna sección válida del VetSystem.
                </p>
                <button
                    onClick={() => navigate('/staff/reception', { replace: true })}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    Regresar al Dashboard
                </button>
            </div>
        </div>
    );
};

export default NotFound;