import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// Importamos la imagen existente en tus assets
import heroImage from '../../../assets/hero.png';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Obtenemos el método login (que espera un objeto LoginCredentials)
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirigir a la ruta intentada previamente o al dashboard por defecto
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalError(null);

        // Validación de UI básica
        if (!email.trim() || !password.trim()) {
            setLocalError('Por favor, completa todos los campos.');
            return;
        }

        setIsSubmitting(true);

        try {
            // CORRECCIÓN ARQUITECTÓNICA: Se envía un objeto que cumple con la interfaz LoginCredentials
            await login({ email, password });
            navigate(from, { replace: true });
        } catch (error) {
            // Utilizamos un mensaje amigable. En un sistema real, el AuthContext nos proveería el error específico si es necesario.
            setLocalError('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Panel Izquierdo: Imagen Hero (Oculto en móviles, visible en pantallas grandes) */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={heroImage}
                    alt="Veterinario cuidando a un perro"
                />
                {/* Overlay con gradiente para la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-teal-900/60 to-teal-800/40 mix-blend-multiply" />

                {/* Texto sobre la imagen */}
                <div className="absolute inset-0 flex flex-col justify-end px-12 pb-24 text-white z-10">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                        {/* Icono de Huella / Veterinaria (SVG Inline) */}
                        <svg className="h-8 w-8 text-teal-100" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.686 2 6 4.686 6 8c0 3.313 2.686 6 6 6s6-2.687 6-6c0-3.314-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zM7 16H5c-1.103 0-2 .897-2 2v4h4v-4h2v-2zm12 0h-2v2h2v4h4v-4c0-1.103-.897-2-2-2zM15 16h-6v8h6v-8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Cuidado experto,<br />tecnología avanzada.
                    </h2>
                    <p className="mt-4 text-lg text-teal-100 max-w-md">
                        Accede al sistema de gestión clínica para visualizar historiales, agendar citas y controlar el inventario de tu sucursal.
                    </p>
                </div>
            </div>

            {/* Panel Derecho: Formulario de Login */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Bienvenido a VetSystem
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Ingresa tus credenciales para acceder a tu panel
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Input: Correo Electrónico */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Correo Electrónico
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm14 2v.511l-7 4.2-7-4.2V6h14zM3 14V8.689l6.53 3.918a1 1 0 001.04 0L17 8.689V14H3z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        disabled={isSubmitting}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:bg-gray-50 transition-colors duration-200"
                                        placeholder="veterinario@clinica.com"
                                    />
                                </div>
                            </div>

                            {/* Input: Contraseña */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        disabled={isSubmitting}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:bg-gray-50 transition-colors duration-200"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Acciones Secundarias (Recordarme / Recuperar) */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                                        Recordar mi sesión
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                            </div>

                            {/* Alerta de Error */}
                            {localError && (
                                <div className="rounded-md bg-red-50 p-4 border border-red-200 animate-pulse">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">{localError}</h3>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botón Submit con Estado de Carga */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex w-full justify-center items-center rounded-md bg-teal-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Autenticando...
                                        </>
                                    ) : (
                                        'Ingresar al Sistema'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};