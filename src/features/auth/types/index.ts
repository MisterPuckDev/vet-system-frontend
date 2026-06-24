export type Role = 'Administrator' | 'Veterinarian' | 'Receptionist' | 'Customer';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    message: string;
    accessToken?: string;
}