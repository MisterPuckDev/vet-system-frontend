import type { Role } from '../../auth/types';
import { HomeIcon, ClinicalIcon, InventoryIcon, BillingIcon, UserIcon } from '../components/Icons';

export interface NavigationItem {
    name: string;
    path: string;
    icon: React.FC<{ className?: string }>;
    allowedRoles: Role[];
}

export const navigationConfig: NavigationItem[] = [
    { name: 'Reception', path: '/reception', icon: HomeIcon, allowedRoles: ['Administrator', 'Receptionist'] },
    { name: 'Clinical Data', path: '/clinical', icon: ClinicalIcon, allowedRoles: ['Administrator', 'Veterinarian'] },
    { name: 'Inventory', path: '/inventory', icon: InventoryIcon, allowedRoles: ['Administrator', 'Veterinarian'] },
    { name: 'Billing POS', path: '/billing', icon: BillingIcon, allowedRoles: ['Administrator', 'Receptionist'] },
    { name: 'Administration', path: '/admin', icon: UserIcon, allowedRoles: ['Administrator'] },
    { name: 'My Portal', path: '/portal', icon: HomeIcon, allowedRoles: ['Customer'] },
];