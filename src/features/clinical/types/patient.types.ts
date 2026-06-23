// src/features/clinical/types/patient.types.ts
export interface Consultation {
    id: string;
    date: string;
    reason: string;
    anamnesis: string;
    diagnosis: string;
    veterinarian: string;
}

export interface MedicalPlan {
    currentDiet: string;
    activeMedications: string[];
    nextCheckup: string;
}

export interface PatientProfile {
    id: string;
    name: string;
    species: 'Felina' | 'Canina' | 'Exótica';
    breed: string;
    age: string;
    weightKg: number;
    allergies: string[]; // Crítico para la UI
    consultationHistory: Consultation[];
    medicalPlan: MedicalPlan;
    ownerId: string;
}