// src/pages/GlobalError.tsx
import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

const GlobalError: React.FC = () => {
    // Hook nativo de React Router para capturar la excepción
    const error = useRouteError();
    const navigate = useNavigate();

    let errorTitle = 'Error Inesperado';
    let errorMessage = 'Ha ocurrido un error interno en la aplicación. Por favor, contacta a soporte técnico.';
    let is404 = false;

    // Verificamos si es un error de navegación (ej. 404 No Encontrado)
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            is404 = true;
            errorTitle = 'Página no encontrada';
            errorMessage = 'La ruta que intentas buscar no existe o ha sido movida.';
        } else {
            errorTitle = `Error ${error.status}`;
            errorMessage = error.statusText;
        }
    } else if (error instanceof Error) {
        // Es un error de código (ej. fallo al cargar un chunk de Vite)
        errorMessage = error.message;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">

                {/* Ícono de Alerta Visual */}
                <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 ${is404 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                    {is404 ? (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    )}
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{errorTitle}</h1>
                <p className="text-gray-600 mb-8">{errorMessage}</p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                    >
                        Regresar a la página anterior
                    </button>
                    <button
                        onClick={() => navigate('/auth/login', { replace: true })}
                        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                    >
                        Ir al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalError;