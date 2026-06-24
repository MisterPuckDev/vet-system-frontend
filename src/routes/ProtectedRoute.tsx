import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../features/auth/context/AuthContext';
import type { Role } from '../features/auth/types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const context = useContext(AuthContext);
    const location = useLocation();

    // Si el contexto no existe, lanzamos un error de desarrollo
    if (!context) {
        throw new Error('ProtectedRoute debe ser utilizado dentro de un AuthProvider');
    }

    const { isAuthenticated, isLoading, user } = context;

    // Mostrar un estado de carga mientras se restaura la sesión desde sessionStorage
    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-gray-600 font-medium">Verificando credenciales de seguridad...</p>
                </div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login guardando la ruta intentada
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si hay roles permitidos definidos, verificar que el usuario tenga el rol adecuado
    if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(user.role as Role)) {
            // Si el rol no coincide, enviarlo a una vista de "No Autorizado"
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // Si pasa todas las validaciones, renderizar el componente hijo
    return <>{children}</>;
};