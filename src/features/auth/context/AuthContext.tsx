import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginCredentials } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const storedUser = sessionStorage.getItem('vet_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (err) {
                console.error('Error al restaurar la sesión:', err);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials);
            setUser(response.user);
            sessionStorage.setItem('vet_user', JSON.stringify(response.user));
        } catch (err: unknown) {
            if (err instanceof Error) {
                // Asignamos el error capturado (que viene en español desde el servicio)
                setError(err.message);
            } else {
                // Mensaje de error genérico en español
                setError('Ocurrió un error inesperado al intentar iniciar sesión.');
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
            sessionStorage.removeItem('vet_user');
        } catch (err) {
            console.error('Error durante el cierre de sesión:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, error, login, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};