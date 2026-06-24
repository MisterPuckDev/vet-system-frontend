import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import type { Role } from '../features/auth/types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <div className="text-lg font-semibold text-gray-600 animate-pulse">
                    Validating credentials...
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};