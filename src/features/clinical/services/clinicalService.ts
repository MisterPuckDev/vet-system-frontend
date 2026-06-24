import type { ClinicalDashboardData, PatientDetails } from '../types';

export const clinicalService = {
    getDashboardData: async (): Promise<ClinicalDashboardData> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve({
                        summary: { todayAppointments: 8, criticalPatients: 2, pendingPrescriptions: 5 },
                        appointments: [
                            { id: 'apt_001', patient: { id: 'pat_101', name: 'Max', species: 'Dog', breed: 'Golden Retriever', ownerName: 'Carlos M.' }, time: '09:00 AM', reason: 'Annual Vaccination', status: 'Completed' },
                            { id: 'apt_002', patient: { id: 'pat_102', name: 'Luna', species: 'Cat', breed: 'Siamese', ownerName: 'Ana G.' }, time: '10:30 AM', reason: 'Renal Control', status: 'In Progress' },
                            { id: 'apt_003', patient: { id: 'pat_103', name: 'Rocky', species: 'Dog', breed: 'Bulldog', ownerName: 'Luis P.' }, time: '11:45 AM', reason: 'Dermatitis checkup', status: 'Scheduled' },
                        ],
                        recentPrescriptions: [
                            { id: 'rx_001', patientName: 'Luna', medication: 'Renal Diet Dry Food', dosage: '50g twice a day', date: '2026-06-24' },
                            { id: 'rx_002', patientName: 'Max', medication: 'NexGard Spectra', dosage: '1 chewable tablet/month', date: '2026-06-24' },
                        ],
                    });
                } catch (error) {
                    reject(new Error('No se pudo cargar la información clínica. Intente nuevamente.'));
                }
            }, 1200);
        });
    },

    getPatientDetails: async (patientId: string): Promise<PatientDetails> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!patientId) {
                    reject(new Error('ID de paciente no válido.'));
                    return;
                }

                // Simulación de respuesta exitosa con datos ricos
                resolve({
                    patient: {
                        id: patientId,
                        name: patientId === 'pat_102' ? 'Luna' : 'Max',
                        species: patientId === 'pat_102' ? 'Cat' : 'Dog',
                        breed: patientId === 'pat_102' ? 'Siamese' : 'Golden Retriever',
                        ownerName: patientId === 'pat_102' ? 'Ana G.' : 'Carlos M.',
                        age: '4 years',
                        weight: patientId === 'pat_102' ? '4.2 kg' : '28.5 kg',
                        allergies: ['Penicillin']
                    },
                    history: [
                        { id: 'hist_1', date: '2026-05-10', veterinarian: 'Dra. Laura Gomez', reason: 'Vomiting and lethargy', diagnosis: 'Mild gastritis', treatment: 'Antiemetics and bland diet for 3 days' },
                        { id: 'hist_2', date: '2025-11-20', veterinarian: 'Dr. Roberto Santos', reason: 'Routine Checkup', diagnosis: 'Healthy', treatment: 'None required' }
                    ],
                    vaccines: [
                        { id: 'vax_1', name: 'Rabies', applicationDate: '2025-11-20', nextDueDate: '2026-11-20', appliedBy: 'Dr. Roberto Santos' },
                        { id: 'vax_2', name: 'FVRCP', applicationDate: '2025-11-20', nextDueDate: '2026-11-20', appliedBy: 'Dr. Roberto Santos' }
                    ],
                    labResults: [
                        { id: 'lab_1', testName: 'Complete Blood Count (CBC)', date: '2026-05-10', result: 'Normal', notes: 'All values within standard physiological range.' },
                        { id: 'lab_2', testName: 'Renal Panel', date: '2026-06-20', result: 'Abnormal', notes: 'Slightly elevated creatinine. Requires dietary adjustment.' }
                    ]
                });
            }, 800);
        });
    }
};