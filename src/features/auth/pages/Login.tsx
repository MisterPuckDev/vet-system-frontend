// src/features/auth/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    // ==========================================
    // 1. DECLARACIÓN DE ESTADOS
    // ==========================================
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // ==========================================
    // 2. LÓGICA DE AUTENTICACIÓN SIMULADA (MOCK)
    // ==========================================
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene la recarga completa del navegador (SPA)

        // Reiniciar estado de error y activar carga
        setError(null);
        setIsLoading(true);

        // Simulación de latencia de red (1.5 segundos) hacia nuestro backend
        setTimeout(() => {
            // Credenciales estáticas de prueba
            if (email === 'admin@vetsystem.com' && password === '123456') {
                // En producción: Aquí guardaríamos el JWT en memoria o validaríamos la cookie HttpOnly.
                // Redirección al dashboard principal configurado en nuestro AppRouter.
                navigate('/staff/reception', { replace: true });
            } else {
                setError('Credenciales incorrectas. Por favor, verifique su correo y contraseña.');
                setIsLoading(false);
            }
        }, 1500);
    };

    // ==========================================
    // 3. RENDERIZADO DE LA INTERFAZ (UI)
    // ==========================================
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            {/* Contenedor principal de la tarjeta de Login */}
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

                {/* Cabecera y Logo Temático */}
                <div className="text-center mb-8">
                    <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        {/* Ícono SVG temático (Pata de mascota + Cruz Médica) */}
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">VetSystem</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Portal de gestión clínica veterinaria
                    </p>
                </div>

                {/* Formulario */}
                <form className="space-y-6" onSubmit={handleLogin}>

                    {/* Mensaje de Error Visual */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-md">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Input: Correo Electrónico */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-colors disabled:opacity-50"
                            placeholder="admin@vetsystem.com"
                        />
                    </div>

                    {/* Input: Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-colors disabled:opacity-50"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Botón de Submit / Estado de Carga */}
                    <button
                        type="submit"
                        disabled={isLoading || !email || !password}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-all 
              ${isLoading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        } disabled:opacity-70`}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
                        ) : (
                            'Ingresar al Sistema'
                        )}
                    </button>
                </form>

                {/* Enlace auxiliar de recuperación de contraseña */}
                <div className="mt-6 text-center">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

            </div>
        </div>
    );
};

// Cumplimiento estricto de ESLint: react-refresh/only-export-components
export default Login;