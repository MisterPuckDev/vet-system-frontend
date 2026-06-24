import axios from 'axios';

// Configuración base de Axios.
// En producción, VITE_API_URL debe apuntar al API Gateway o Backend de Java.
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor de Peticiones: Inyectar JWT
apiClient.interceptors.request.use(
    (config) => {
        // Para la fase Mock, extraemos el usuario del sessionStorage.
        // NOTA: En producción, se prefiere httpOnly cookies para evitar XSS.
        const storedUser = sessionStorage.getItem('vet_user');

        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                // Si tu mock almacena un accessToken, inyectarlo aquí.
                // Requieres modificar tu AuthContext para guardar el token devuelto por el mock.
                if (user.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
            } catch (error) {
                console.error('Error parseando sesión en el interceptor:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de Respuestas: Manejo global de errores y Refresh Token
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejo estandarizado de error 401 (No autorizado) o expiración de JWT
        if (error.response && error.response.status === 401) {
            console.warn('Sesión expirada o inválida. Forzando cierre de sesión local.');
            sessionStorage.removeItem('vet_user');
            // Recargar la ventana limpia el estado en memoria de React y fuerza el redireccionamiento de las ProtectedRoutes
            window.location.href = '/login';
        }

        // Manejo de errores de red o CORS
        if (!error.response) {
            console.error('Error de red. Verifica si el backend está en ejecución y las políticas CORS.');
        }

        return Promise.reject(error);
    }
);