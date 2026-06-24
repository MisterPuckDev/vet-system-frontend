import type {LoginCredentials, AuthResponse} from '../types';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.email === 'admin@vetsystem.com' && credentials.password === 'admin123') {
                    resolve({
                        user: {
                            id: 'usr_001',
                            email: 'admin@vetsystem.com',
                            firstName: 'Carlos',
                            lastName: 'Mendoza',
                            role: 'Administrator'
                        },
                        message: 'Authentication successful',
                        accessToken: 'mock_jwt_token_admin_123'
                    });
                } else if (credentials.email === 'vet@vetsystem.com' && credentials.password === 'vet123') {
                    resolve({
                        user: {
                            id: 'usr_002',
                            email: 'vet@vetsystem.com',
                            firstName: 'Laura',
                            lastName: 'Gomez',
                            role: 'Veterinarian'
                        },
                        message: 'Authentication successful',
                        accessToken: 'mock_jwt_token_vet_456'
                    });
                } else if (credentials.email === 'cli@vetsystem.com' && credentials.password === 'cli123') {
                    resolve({
                        user: {
                            id: 'usr_003',
                            email: 'cli@vetsystem.com',
                            firstName: 'Frank',
                            lastName: 'Gomez',
                            role: 'Customer'
                        },
                        message: 'Authentication successful',
                        accessToken: 'mock_jwt_token_cli_789'
                    });
                } else {
                    // Mensaje de error en Español, tal como se solicitó
                    reject(new Error('Credenciales inválidas. Por favor, verifique su usuario y contraseña.'));
                }
            }, 1000);
        });
    },

    logout: async (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }
};