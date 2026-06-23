// src/config/menuConfig.ts
import { UserRole } from '../routes/ProtectedRoute';

export interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon: string; // En producción, esto podría ser un componente React.ElementType
    allowedRoles: UserRole[];
}

export const STAFF_MENU_ITEMS: MenuItem[] = [
    {
        id: 'dashboard',
        label: 'Recepción',
        path: '/staff/reception',
        icon: 'LayoutDashboard',
        allowedRoles: ['ADMIN', 'RECEPTION', 'VET'],
    },
    {
        id: 'clinical',
        label: 'Historia Clínica',
        path: '/staff/clinical/records',
        icon: 'Stethoscope',
        allowedRoles: ['ADMIN', 'VET'],
    },
    {
        id: 'inventory',
        label: 'Inventario',
        path: '/staff/inventory',
        icon: 'Package',
        allowedRoles: ['ADMIN', 'VET'],
    },
    {
        id: 'billing',
        label: 'Punto de Venta (POS)',
        path: '/staff/billing/pos',
        icon: 'CreditCard',
        allowedRoles: ['ADMIN', 'RECEPTION'],
    },
    {
        id: 'metrics',
        label: 'Métricas y Reportes',
        path: '/staff/admin/metrics',
        icon: 'TrendingUp',
        allowedRoles: ['ADMIN'],
    },
];