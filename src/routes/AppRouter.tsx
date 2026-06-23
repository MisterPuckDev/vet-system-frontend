// src/routes/AppRouter.tsx
import React, {lazy, Suspense} from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import {ProtectedRoute} from './ProtectedRoute';
import GlobalError from '../pages/GlobalError'; // Importación NORMAL, no lazy

// ==========================================
// 1. ESTADO VISUAL DE CARGA (FALLBACK)
// ==========================================
const LoadingFallback: React.FC = () => (
    <div className="flex items-center justify-center h-screen bg-gray-50 w-full">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Cargando módulo...</p>
        </div>
    </div>
);

// ==========================================
// 2. DEFINICIÓN DE COMPONENTES PEREZOSOS
// ==========================================
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const StaffLayout = lazy(() => import('../layouts/StaffLayout'));
// const ClientLayout = lazy(() => import('../layouts/ClientLayout'));

const Login = lazy(() => import('../features/auth/pages/Login'));
// const Unauthorized = lazy(() => import('../features/auth/pages/Unauthorized'));

const ReceptionDashboard = lazy(() => import('../features/reception/pages/Dashboard'));
// const MedicalRecords = lazy(() => import('../features/clinical/pages/MedicalRecords'));
const PatientClinicalHistory = lazy(() => import('../features/clinical/pages/PatientClinicalHistory'));
// const InventoryCatalog = lazy(() => import('../features/inventory/pages/Catalog'));
// const BillingPOS = lazy(() => import('../features/billing/pages/POS'));
// const AdminMetrics = lazy(() => import('../features/admin/pages/Metrics'));
// const ClientPets = lazy(() => import('../features/client-portal/pages/MyPets'));

// ==========================================
// 3. CONFIGURACIÓN DEL ENRUTADOR PRINCIPAL
// ==========================================
export const router = createBrowserRouter([
    {
        // ENVOLTORIO RAÍZ INVISIBLE PARA MANEJO GLOBAL DE ERRORES
        errorElement: <GlobalError/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/auth/login" replace/>,
            },

            // --- RUTAS PÚBLICAS Y AUTENTICACIÓN ---
            {
                path: '/auth',
                element: (
                    <Suspense fallback={<LoadingFallback/>}>
                        <AuthLayout/>
                    </Suspense>
                ),
                children: [
                    {
                        path: 'login',
                        element: (
                            <Suspense fallback={<LoadingFallback/>}>
                                <Login/>
                            </Suspense>
                        ),
                    },
                ],
            },
            // {
            //     path: '/unauthorized',
            //     element: (
            //         <Suspense fallback={<LoadingFallback/>}>
            //             <Unauthorized/>
            //         </Suspense>
            //     ),
            // },

            // --- RUTAS PRIVADAS: PERSONAL DE LA CLÍNICA (STAFF) ---
            {
                path: '/staff',
                element: (
                    <Suspense fallback={<LoadingFallback/>}>
                        <StaffLayout/>
                    </Suspense>
                ),
                children: [
                    {
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'VET', 'RECEPTION']}/>,
                        children: [
                            {
                                path: 'reception',
                                element: (
                                    <Suspense fallback={<LoadingFallback/>}>
                                        <ReceptionDashboard/>
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    // {
                    //     element: <ProtectedRoute allowedRoles={['ADMIN', 'VET']}/>,
                    //     children: [
                    //         {
                    //             path: 'clinical/records',
                    //             element: (
                    //                 <Suspense fallback={<LoadingFallback/>}>
                    //                     <MedicalRecords/>
                    //                 </Suspense>
                    //             ),
                    //         },
                    //         {
                    //             path: 'inventory',
                    //             element: (
                    //                 <Suspense fallback={<LoadingFallback/>}>
                    //                     <InventoryCatalog/>
                    //                 </Suspense>
                    //             ),
                    //         },
                    //     ],
                    // },
                    // {
                    //     element: <ProtectedRoute allowedRoles={['ADMIN', 'RECEPTION']}/>,
                    //     children: [
                    //         {
                    //             path: 'billing/pos',
                    //             element: (
                    //                 <Suspense fallback={<LoadingFallback/>}>
                    //                     <BillingPOS/>
                    //                 </Suspense>
                    //             ),
                    //         },
                    //     ],
                    // },
                    // {
                    //     element: <ProtectedRoute allowedRoles={['ADMIN']}/>,
                    //     children: [
                    //         {
                    //             path: 'admin/metrics',
                    //             element: (
                    //                 <Suspense fallback={<LoadingFallback/>}>
                    //                     <AdminMetrics/>
                    //                 </Suspense>
                    //             ),
                    //         },
                    //     ],
                    // },
                ],
            },

            // --- RUTA PRIVADA: HISTORIA CLÍNICA DINÁMICA ---
            {
                path: '/clinica',
                element: (
                    <Suspense fallback={<LoadingFallback/>}>
                        <StaffLayout/>
                    </Suspense>
                ),
                children: [
                    {
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'VET']}/>,
                        children: [
                            {
                                path: 'paciente/:patientId',
                                element: (
                                    <Suspense fallback={<LoadingFallback/>}>
                                        <PatientClinicalHistory/>
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                ],
            },

            // --- RUTAS PRIVADAS: PORTAL PARA DUEÑOS DE MASCOTAS ---
            // {
            //     path: '/portal',
            //     element: (
            //         <Suspense fallback={<LoadingFallback/>}>
            //             <ClientLayout/>
            //         </Suspense>
            //     ),
            //     children: [
            //         {
            //             element: <ProtectedRoute allowedRoles={['CLIENT']}/>,
            //             children: [
            //                 {
            //                     path: 'my-pets',
            //                     element: (
            //                         <Suspense fallback={<LoadingFallback/>}>
            //                             <ClientPets/>
            //                         </Suspense>
            //                     ),
            //                 },
            //             ],
            //         },
            //     ],
            // },
        ],
    },
]);