export interface WaitingPatient {
    id: string;
    petName: string;
    ownerName: string;
    reason: string;
    waitingTimeMinutes: number;
}

export interface Appointment {
    id: string;
    time: string;
    petName: string;
    vetName: string;
    status: 'Confirmada' | 'En Progreso' | 'Pendiente';
}

const waitingRoomMocks: WaitingPatient[] = [
    { id: 'w1', petName: 'Luna', ownerName: 'Carlos Gómez', reason: 'Vacunación Anual', waitingTimeMinutes: 15 },
    { id: 'w2', petName: 'Max', ownerName: 'Ana Silva', reason: 'Revisión por vómitos', waitingTimeMinutes: 5 },
];

const todayAppointmentsMocks: Appointment[] = [
    { id: 'a1', time: '09:00 AM', petName: 'Bela', vetName: 'Dra. Sarah', status: 'Confirmada' },
    { id: 'a2', time: '10:30 AM', petName: 'Rocky', vetName: 'Dr. Alejandro', status: 'Pendiente' },
    { id: 'a3', time: '11:00 AM', petName: 'Simba', vetName: 'Dra. Sarah', status: 'Confirmada' },
];

// Simulador de API con retraso de 1.5 segundos
export const fetchDashboardData = async () => {
    return new Promise<{ waiting: WaitingPatient[]; appointments: Appointment[] }>((resolve) => {
        setTimeout(() => {
            resolve({ waiting: waitingRoomMocks, appointments: todayAppointmentsMocks });
        }, 1500);
    });
};