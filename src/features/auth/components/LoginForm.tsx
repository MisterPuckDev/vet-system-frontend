import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [localError, setLocalError] = useState<string | null>(null);
    const { login, isLoading, error, clearError, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'Administrator') navigate('/admin');
            else if (user.role === 'Veterinarian') navigate('/clinical');
            else if (user.role === 'Receptionist') navigate('/reception');
            else if (user.role === 'Customer') navigate('/portal');
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalError(null);

        if (!email.trim() || !password.trim()) {
            setLocalError('Todos los campos son obligatorios.'); // Error en Español
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setLocalError('Por favor, ingrese un correo electrónico válido.'); // Error en Español
            return;
        }

        try {
            await login({ email, password });
        } catch (err) {
            console.warn('Login attempt failed - intercepted successfully.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        VetSystem
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Access your clinical management dashboard
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                disabled={isLoading}
                                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Email address (e.g. admin@vetsystem.com)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Password (e.g. admin123)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {(localError || error) && (
                        <div className="rounded-md bg-red-50 p-4 border border-red-200">
                            <div className="flex">
                                <div className="text-sm font-medium text-red-800">
                                    {localError || error}
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
                            }`}
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};