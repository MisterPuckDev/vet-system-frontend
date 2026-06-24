export type AppointmentStatus = 'Scheduled' | 'Waiting' | 'In Consultation' | 'Completed' | 'Cancelled';

export interface ReceptionPet {
    id: string;
    name: string;
    species: string;
}

export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    pets: ReceptionPet[];
}

export interface ReceptionAppointment {
    id: string;
    time: string;
    clientName: string;
    petName: string;
    reason: string;
    status: AppointmentStatus;
    veterinarian: string;
}

export interface ReceptionMetrics {
    todayTotalAppointments: number;
    waitingRoomCount: number;
    completedAppointments: number;
}

export interface ReceptionData {
    metrics: ReceptionMetrics;
    todayAppointments: ReceptionAppointment[];
    clients: Client[];
}