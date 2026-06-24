import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    // Pantalla de carga mientras se restaura la sesión desde sessionStorage
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Protección Global de Rutas Internas: Si no hay sesión, expulsa al login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex flex-col flex-1 w-full">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Contenedor principal donde se inyectan las vistas de Vite/React Router */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 scroll-smooth">
                    <div className="mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};