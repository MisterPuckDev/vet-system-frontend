import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { LoginForm } from '../features/auth/components/LoginForm';
import { ProtectedRoute } from './ProtectedRoute';
import { Layout } from '../features/shared/components/Layout'; // Importamos el nuevo Layout

// Lazy loading Feature Slices
const ReceptionDashboard = React.lazy(() => import('../features/reception/ReceptionDashboard'));
const ClinicalRoutes = React.lazy(() => import('../features/clinical/ClinicalRoutes'));
const InventoryDashboard = React.lazy(() => import('../features/inventory/InventoryDashboard'));
const BillingDashboard = React.lazy(() => import('../features/billing/BillingDashboard'));
const AdminDashboard = React.lazy(() => import('../features/admin/AdminDashboard'));
const CustomerPortal = React.lazy(() => import('../features/portal/CustomerPortal'));
const Unauthorized = React.lazy(() => import('../features/shared/Unauthorized'));

const GlobalLoader: React.FC = () => (
    <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
);

// Este es el cascarón que inyecta el Contexto a toda la app
const RootLayout: React.FC = () => (
    <AuthProvider>
        <Suspense fallback={<GlobalLoader />}>
            <Outlet />
        </Suspense>
    </AuthProvider>
);

export const router = createBrowserRouter([
    {
        element: <RootLayout />, // El nivel superior provee Autenticación y Suspense
        children: [
            { path: '/login', element: <LoginForm /> },
            { path: '/unauthorized', element: <Unauthorized /> },

            // Rutas Protegidas Envueltas en el Layout Global (Sidebar + Header)
            {
                element: <Layout />,
                children: [
                    {
                        path: '/reception/*',
                        element: (
                            <ProtectedRoute allowedRoles={['Receptionist', 'Administrator']}>
                                <ReceptionDashboard />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: '/clinical/*',
                        element: (
                            <ProtectedRoute allowedRoles={['Veterinarian', 'Administrator']}>
                                <ClinicalRoutes />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: '/inventory/*',
                        element: (
                            <ProtectedRoute allowedRoles={['Administrator', 'Veterinarian']}>
                                <InventoryDashboard />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: '/billing/*',
                        element: (
                            <ProtectedRoute allowedRoles={['Administrator', 'Receptionist']}>
                                <BillingDashboard />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: '/admin/*',
                        element: (
                            <ProtectedRoute allowedRoles={['Administrator']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: '/portal/*',
                        element: (
                            <ProtectedRoute allowedRoles={['Customer']}>
                                <CustomerPortal />
                            </ProtectedRoute>
                        )
                    },
                    // Redirección por defecto post-login hacia una capa segura según el rol
                    { path: '/dashboard', element: <Navigate to="/clinical" replace /> }
                ]
            },
            // Fallback para URLs no encontradas
            { path: '*', element: <Navigate to="/login" replace /> }
        ]
    }
]);