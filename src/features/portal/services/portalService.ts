import type { CustomerDashboardData } from '../types';

export const portalService = {
    getDashboardData: async (): Promise<CustomerDashboardData> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve({
                        pets: [
                            {
                                id: 'pet_001',
                                name: 'Toby',
                                species: 'Dog',
                                breed: 'Beagle',
                                age: '3 años',
                                weight: '12 kg',
                                nextVaccineDate: '2026-10-15',
                                avatarColor: 'bg-amber-100 text-amber-700'
                            },
                            {
                                id: 'pet_002',
                                name: 'Misha',
                                species: 'Cat',
                                breed: 'Persa',
                                age: '7 años',
                                weight: '4.5 kg',
                                avatarColor: 'bg-rose-100 text-rose-700'
                            }
                        ],
                        upcomingAppointments: [
                            {
                                id: 'apt_101',
                                petName: 'Toby',
                                date: '2026-06-30',
                                time: '10:00 AM',
                                veterinarian: 'Dra. Laura Gómez',
                                reason: 'Control de peso y desparasitación',
                                status: 'Scheduled'
                            }
                        ],
                        activePrescriptions: [
                            {
                                id: 'rx_201',
                                petName: 'Misha',
                                medication: 'Alimento Royal Canin Renal Care',
                                instructions: 'Servir 45 gramos dos veces al día. Asegurar siempre agua fresca disponible.',
                                issuedDate: '2026-06-15',
                                veterinarian: 'Dra. Laura Gómez',
                                isChronic: true
                            },
                            {
                                id: 'rx_202',
                                petName: 'Toby',
                                medication: 'NexGard Spectra',
                                instructions: 'Dar 1 tableta masticable el día 15 de cada mes.',
                                issuedDate: '2026-05-15',
                                veterinarian: 'Dr. Roberto Santos',
                                isChronic: false
                            }
                        ]
                    });
                } catch (error) {
                    reject(new Error('No hemos podido cargar la información de sus mascotas. Por favor, intente en unos minutos.'));
                }
            }, 800); // Simulamos 0.8s de red
        });
    }
};