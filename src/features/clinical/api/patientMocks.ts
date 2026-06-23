// src/features/clinical/api/patientMocks.ts

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

export interface Patient {
    id: string;
    name: string;
    species: 'Felina' | 'Canina' | 'Exótica';
    breed: string;
    age: string;
    weightKg: number;
    allergies: string[];
    consultationHistory: Consultation[];
    medicalPlan: MedicalPlan;
    ownerId: string;
}

export const mockFelineCKDPatient: Patient = {
    id: 'p-1029',
    name: 'Salem',
    species: 'Felina',
    breed: 'Mestizo (Shorthair)',
    age: '12 años',
    weightKg: 4.2,
    allergies: ['Penicilina', 'Ketamina (Hipotensión severa)'],
    ownerId: 'own-551',
    consultationHistory: [
        {
            id: 'c-882',
            date: '2026-05-10',
            reason: 'Control mensual Renal',
            anamnesis: 'Propietario reporta buen apetito con dieta renal. Aumento leve en consumo de agua. Vómitos esporádicos (1 vez por semana).',
            diagnosis: 'Enfermedad Renal Crónica (Estadio II IRIS) - Estable.',
            veterinarian: 'Dra. Sarah',
        },
        {
            id: 'c-741',
            date: '2026-03-15',
            reason: 'Decaimiento y anorexia',
            anamnesis: 'Letargia marcada hace 48hs. Mucosas pálidas. Deshidratación ~8%.',
            diagnosis: 'Crisis urémica aguda secundaria a ERC.',
            veterinarian: 'Dr. Alejandro',
        }
    ],
    medicalPlan: {
        currentDiet: 'Royal Canin Renal Feline (Seco + Húmedo 50/50)',
        activeMedications: [
            'Benazepril 2.5mg - 1/2 tableta c/24h',
            'Quelante de fósforo (Carbonato de calcio) - 1 medida con las comidas',
            'Maropitant 16mg - 1/4 tableta en caso de vómitos'
        ],
        nextCheckup: '2026-07-10',
    }
};