// src/layouts/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * AuthLayout: Contenedor diseñado específicamente para flujos de autenticación.
 * - Centra el contenido en pantalla completa.
 * - Fondo neutro para evitar distracciones.
 * - Utiliza <Outlet /> para renderizar el componente hijo (Login, Registro, Recuperación).
 */
const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* El Outlet es el punto de inserción donde se renderizará el componente Login */}
            <main className="w-full">
                <Outlet />
            </main>

            {/* Pie de página sutil para branding de la clínica */}
            <footer className="fixed bottom-4 text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} VetSystem - Gestión Veterinaria Inteligente
            </footer>
        </div>
    );
};

export default AuthLayout;