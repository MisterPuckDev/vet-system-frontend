import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Definición estricta de roles del sistema VetSystem
export type UserRole = 'ADMIN' | 'VET' | 'RECEPTION' | 'CLIENT';

interface ProtectedRouteProps {
    allowedRoles: UserRole[];
}

/**
 * Hook de simulación o lectura del estado global/auth.
 * En producción, esto consumirá un Contexto o un Store (Zustand/Redux) conectado a Axios.
 */
const useAuth = () => {
    // Simulación de datos recuperados del almacenamiento seguro (ej. memoria de la app tras validar Refresh Token)
    const token = localStorage.getItem('vs_auth_token'); // Nota: Solo para verificar existencia, el token real debe persistir seguro.
    const user = token ? { id: '1', name: 'Dr. Alejandro', role: 'VET' as UserRole } : null;

    return {
        isAuthenticated: !!user,
        user,
    };
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    // 1. Validar Autenticación: Si no está logueado, redirige al login guardando la ruta origen
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // 2. Validar Autorización: Si el rol del usuario no está explícitamente permitido
    if (user && !allowedRoles.includes(user.role)) {
        // Redirige a una página de acceso denegado o al dashboard base según su rol
        return <Navigate to="/unauthorized" replace />;
    }

    // 3. Si pasa las validaciones, renderiza las rutas hijas mediante el Outlet
    return <Outlet />;
};