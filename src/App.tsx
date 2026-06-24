import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { LoginForm } from './features/auth/components/LoginForm';
import { ProtectedRoute } from './routes/ProtectedRoute';

const RecepcionDashboard = React.lazy(() => import('./features/reception/./ReceptionDashboard'));
const ClinicoDashboard = React.lazy(() => import('./features/clinical/ClinicalDashboard.tsx'));
const InventarioDashboard = React.lazy(() => import('./features/inventory/./InventoryDashboard'));
const FacturacionDashboard = React.lazy(() => import('./features/billing/./BillingDashboard'));
const AdminDashboard = React.lazy(() => import('./features/admin/AdminDashboard'));
const ClientePortal = React.lazy(() => import('./features/portal/./CustomerPortal'));
const Unauthorized = React.lazy(() => import('./features/shared/Unauthorized'));

const GlobalLoader: React.FC = () => (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
);

const App: React.FC = () => {
  return (
      <AuthProvider>
        <Router>
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route
                  path="/recepcion/*"
                  element={
                    <ProtectedRoute allowedRoles={['Recepcionista', 'Administrador']}>
                      <RecepcionDashboard />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="/clinico/*"
                  element={
                    <ProtectedRoute allowedRoles={['Veterinario', 'Administrador']}>
                      <ClinicoDashboard />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="/inventario/*"
                  element={
                    <ProtectedRoute allowedRoles={['Administrador', 'Veterinario']}>
                      <InventarioDashboard />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="/facturacion/*"
                  element={
                    <ProtectedRoute allowedRoles={['Administrador', 'Recepcionista']}>
                      <FacturacionDashboard />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={['Administrador']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="/portal/*"
                  element={
                    <ProtectedRoute allowedRoles={['Cliente']}>
                      <ClientePortal />
                    </ProtectedRoute>
                  }
              />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
  );
};

export default App;