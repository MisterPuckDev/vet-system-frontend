export type AppointmentStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Patient {
    id: string;
    name: string;
    species: string;
    breed: string;
    ownerName: string;
    age?: string;
    weight?: string;
    allergies?: string[];
}

export interface Appointment {
    id: string;
    patient: Patient;
    time: string;
    reason: string;
    status: AppointmentStatus;
}

export interface Prescription {
    id: string;
    patientName: string;
    medication: string;
    dosage: string;
    date: string;
}

export interface ClinicalSummary {
    todayAppointments: number;
    criticalPatients: number;
    pendingPrescriptions: number;
}

export interface ClinicalDashboardData {
    summary: ClinicalSummary;
    appointments: Appointment[];
    recentPrescriptions: Prescription[];
}

// Nuevos tipos para la Historia Clínica Profunda
export interface MedicalHistoryEntry {
    id: string;
    date: string;
    veterinarian: string;
    reason: string;
    diagnosis: string;
    treatment: string;
}

export interface VaccineRecord {
    id: string;
    name: string;
    applicationDate: string;
    nextDueDate: string;
    appliedBy: string;
}

export interface LabResult {
    id: string;
    testName: string;
    date: string;
    result: 'Normal' | 'Abnormal' | 'Critical';
    notes: string;
}

export interface PatientDetails {
    patient: Patient;
    history: MedicalHistoryEntry[];
    vaccines: VaccineRecord[];
    labResults: LabResult[];
}