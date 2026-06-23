// src/layouts/StaffLayout.tsx
import React, { useState, useMemo } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { STAFF_MENU_ITEMS } from '../config/menuConfig';

// Mock de hook de autenticación (Reemplazar con Zustand, Redux o Context real)
const useAuthMock = () => {
    return {
        user: { name: 'Dra. Sarah', role: 'VET' as const },
        logout: async () => {
            console.log('Cerrando sesión...');
            // Lógica real: localStorage.removeItem('token'), limpiar estado global, etc.
        },
    };
};

const StaffLayout: React.FC = () => {
    const { user, logout } = useAuthMock();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Lógica de filtrado por roles: Memorizada para evitar re-cálculos en re-renders de UI
    const filteredMenu = useMemo(() => {
        return STAFF_MENU_ITEMS.filter((item) =>
            item.allowedRoles.includes(user.role)
        );
    }, [user.role]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/auth/login', { replace: true });
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* --- SIDEBAR (Menú Lateral) --- */}
            {/* Overlay oscuro para móviles */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                {/* Logo de la Clínica */}
                <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
                    <span className="text-xl font-bold text-blue-600">VetSystem</span>
                </div>

                {/* Navegación Filtrada */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {filteredMenu.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)} // Cierra en móviles al clickear
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            {/* Aquí iría el ícono real basado en item.icon */}
                            <div className="w-5 h-5 bg-gray-300 rounded-sm" aria-hidden="true" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Perfil y Logout */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{user.name}</span>
                            <span className="text-xs text-gray-500">{user.role}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* --- ÁREA PRINCIPAL (Header + Contenido) --- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header Superior */}
                <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200 md:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none"
                        aria-label="Abrir menú"
                    >
                        {/* Ícono de Hamburguesa (SVG genérico) */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span className="font-semibold text-gray-900">VetSystem</span>
                    <div className="w-6" /> {/* Espaciador para centrar el texto */}
                </header>

                {/* Contenido Dinámico de la Ruta */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default StaffLayout;