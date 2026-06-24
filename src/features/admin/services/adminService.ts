import type { AdminData, SystemUser } from '../types';

const mockUsers: SystemUser[] = [
    { id: 'usr_001', firstName: 'Carlos', lastName: 'Mendoza', email: 'admin@vetsystem.com', role: 'Administrator', isActive: true, lastLogin: '2026-06-24T08:30:00Z' },
    { id: 'usr_002', firstName: 'Laura', lastName: 'Gomez', email: 'vet@vetsystem.com', role: 'Veterinarian', isActive: true, lastLogin: '2026-06-24T09:15:00Z' },
    { id: 'usr_003', firstName: 'Maria', lastName: 'Erazo', email: 'recepcion@vetsystem.com', role: 'Receptionist', isActive: true, lastLogin: '2026-06-24T07:50:00Z' },
    { id: 'usr_004', firstName: 'Roberto', lastName: 'Santos', email: 'roberto@vetsystem.com', role: 'Veterinarian', isActive: false, lastLogin: '2026-05-10T14:20:00Z' },
];

export const adminService = {
    getAdminData: async (): Promise<AdminData> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve({
                        metrics: {
                            totalRevenueMonthly: 15420.50,
                            totalAppointmentsMonthly: 342,
                            newCustomersMonthly: 45,
                            revenueChartData: [
                                { date: '2026-06-18', amount: 450 },
                                { date: '2026-06-19', amount: 680 },
                                { date: '2026-06-20', amount: 820 },
                                { date: '2026-06-21', amount: 310 }, // Domingo
                                { date: '2026-06-22', amount: 950 },
                                { date: '2026-06-23', amount: 1100 },
                                { date: '2026-06-24', amount: 720 },
                            ]
                        },
                        users: [...mockUsers]
                    });
                } catch (error) {
                    reject(new Error('No se pudieron cargar los datos de administración. Verifique su conexión.'));
                }
            }, 1000); // Simulamos 1s de latencia
        });
    },

    toggleUserStatus: async (userId: string, newStatus: boolean): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userId === 'usr_001') {
                    reject(new Error('Acción denegada: No puede desactivar la cuenta del Administrador principal.'));
                    return;
                }
                // En un entorno real aquí se haría la mutación en base de datos
                resolve();
            }, 600);
        });
    }
};