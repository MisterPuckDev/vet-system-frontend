export interface Pet {
    id: string;
    name: string;
    species: 'Dog' | 'Cat' | 'Bird' | 'Other';
    breed: string;
    age: string;
    weight: string;
    nextVaccineDate?: string;
    avatarColor: string; // Para generar un círculo de color amigable
}

export interface CustomerAppointment {
    id: string;
    petName: string;
    date: string;
    time: string;
    veterinarian: string;
    reason: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface CustomerPrescription {
    id: string;
    petName: string;
    medication: string;
    instructions: string;
    issuedDate: string;
    veterinarian: string;
    isChronic: boolean; // Útil para resaltar medicamentos continuos
}

export interface CustomerDashboardData {
    pets: Pet[];
    upcomingAppointments: CustomerAppointment[];
    activePrescriptions: CustomerPrescription[];
}