import type { Role } from '../../auth/types';

export interface SystemUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    isActive: boolean;
    lastLogin: string;
}

export interface RevenueData {
    date: string;
    amount: number;
}

export interface DashboardMetrics {
    totalRevenueMonthly: number;
    totalAppointmentsMonthly: number;
    newCustomersMonthly: number;
    revenueChartData: RevenueData[]; // Para futuros gráficos
}

export interface AdminData {
    metrics: DashboardMetrics;
    users: SystemUser[];
}