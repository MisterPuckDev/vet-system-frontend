import type { ReceptionData, Client, ReceptionAppointment, AppointmentStatus } from '../types';

let mockClients: Client[] = [
    { id: 'cli_001', firstName: 'Carlos', lastName: 'Mendoza', phone: '+51 987 654 321', email: 'carlos@example.com', pets: [{ id: 'pet_1', name: 'Max', species: 'Dog' }] },
];

let mockAppointments: ReceptionAppointment[] = [
    { id: 'apt_001', time: '08:00 AM', clientName: 'Carlos Mendoza', petName: 'Max', reason: 'Annual Vaccination', status: 'Completed', veterinarian: 'Dra. Laura Gomez' },
];

export const receptionService = {
    getReceptionData: async (): Promise<ReceptionData> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    metrics: { todayTotalAppointments: mockAppointments.length, waitingRoomCount: mockAppointments.filter(a => a.status === 'Waiting').length, completedAppointments: mockAppointments.filter(a => a.status === 'Completed').length },
                    todayAppointments: [...mockAppointments],
                    clients: [...mockClients]
                });
            }, 500);
        });
    },

    addClient: async (data: Omit<Client, 'id' | 'pets'>): Promise<void> => {
        return new Promise((resolve) => setTimeout(() => {
            mockClients = [{ ...data, id: `cli_${Date.now()}`, pets: [] }, ...mockClients];
            resolve();
        }, 600));
    },

    addAppointment: async (data: Omit<ReceptionAppointment, 'id' | 'status'>): Promise<void> => {
        return new Promise((resolve) => setTimeout(() => {
            mockAppointments = [...mockAppointments, { ...data, id: `apt_${Date.now()}`, status: 'Scheduled' }];
            resolve();
        }, 600));
    },

    updateAppointmentStatus: async (id: string, status: AppointmentStatus): Promise<void> => {
        return new Promise((resolve) => setTimeout(() => {
            const idx = mockAppointments.findIndex(a => a.id === id);
            if (idx !== -1) mockAppointments[idx].status = status;
            resolve();
        }, 300));
    }
};