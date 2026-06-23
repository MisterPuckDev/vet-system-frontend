// src/features/reception/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';

// ==========================================
// 1. TIPOS LOCALES (No exportados por reglas de ESLint)
// ==========================================
interface WaitingPatient {
    id: string;
    ownerName: string;
    petName: string;
    reason: string;
    waitingMinutes: number;
}

interface Appointment {
    id: string;
    time: string;
    petName: string;
    vetName: string;
    status: 'Confirmada' | 'Pendiente' | 'En Progreso';
}

// ==========================================
// 2. MOCKS LOCALES (No exportados)
// ==========================================
const waitingRoomMocks: WaitingPatient[] = [
    { id: 'w-1', ownerName: 'Carlos Gómez', petName: 'Luna', reason: 'Vacunación Anual', waitingMinutes: 5 },
    { id: 'w-2', ownerName: 'Ana Silva', petName: 'Max', reason: 'Revisión por vómitos', waitingMinutes: 18 },
    { id: 'w-3', ownerName: 'Luis Pérez', petName: 'Coco', reason: 'Corte de uñas', waitingMinutes: 2 },
];

const todayAppointmentsMocks: Appointment[] = [
    { id: 'a-1', time: '09:00 AM', petName: 'Bela', vetName: 'Dra. Sarah', status: 'Confirmada' },
    { id: 'a-2', time: '10:30 AM', petName: 'Rocky', vetName: 'Dr. Alejandro', status: 'Pendiente' },
    { id: 'a-3', time: '11:00 AM', petName: 'Simba', vetName: 'Dra. Sarah', status: 'Confirmada' },
    { id: 'a-4', time: '01:00 PM', petName: 'Nala', vetName: 'Dr. Alejandro', status: 'En Progreso' },
];

// ==========================================
// 3. COMPONENTE PRINCIPAL
// ==========================================
const ReceptionDashboard: React.FC = () => {
    // Estados
    const [waitingList, setWaitingList] = useState<WaitingPatient[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Simulación de carga asíncrona
    useEffect(() => {
        const loadDashboardData = async () => {
            setIsLoading(true);

            // Retraso simulado de 1 segundo
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setWaitingList(waitingRoomMocks);
            setAppointments(todayAppointmentsMocks);
            setIsLoading(false);
        };

        loadDashboardData();
    }, []);

    // Estado Visual de Carga
    if (isLoading) {
        return (
            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                <p className="text-center text-gray-500 font-medium animate-pulse mt-4">
                    Cargando panel...
                </p>
            </div>
        );
    }

    // Interfaz Principal
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

            {/* Cabecera del Dashboard */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Panel de Recepción - Hoy</h1>
                    <p className="text-sm text-gray-500 mt-1">Resumen de la actividad en sala de espera y agenda.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors whitespace-nowrap">
                    + Nueva Cita
                </button>
            </header>

            {/* Cuadrícula de Tarjetas (Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* --- TARJETA 1: SALA DE ESPERA --- */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Sala de Espera
                        </h2>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
              {waitingList.length} Pacientes
            </span>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                        {waitingList.length === 0 ? (
                            <p className="text-gray-500 text-center py-4 italic">No hay pacientes esperando.</p>
                        ) : (
                            <ul className="space-y-4">
                                {waitingList.map((patient) => (
                                    <li key={patient.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-base">{patient.petName} <span className="text-sm font-normal text-gray-500">({patient.ownerName})</span></h3>
                                            <p className="text-sm text-gray-600 mt-1"><span className="font-medium text-gray-700">Motivo:</span> {patient.reason}</p>
                                        </div>
                                        <div className="text-right">
                                            {/* Lógica UX: Esperas mayores a 15 min se marcan en rojo */}
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold ${
                                                patient.waitingMinutes > 15
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                        {patient.waitingMinutes} min
                      </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                {/* --- TARJETA 2: CITAS DEL DÍA --- */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Citas del Día
                        </h2>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                        {appointments.length === 0 ? (
                            <p className="text-gray-500 text-center py-4 italic">No hay más citas programadas para hoy.</p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {appointments.map((apt) => (
                                    <div key={apt.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                        <div className="w-20 flex-shrink-0 text-sm font-bold text-gray-700">
                                            {apt.time}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{apt.petName}</p>
                                            <p className="text-xs text-gray-500 truncate">{apt.vetName}</p>
                                        </div>
                                        <div>
                                            {/* Lógica UX: Indicadores de estado semánticos */}
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${
                                                apt.status === 'Confirmada' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                                                    apt.status === 'Pendiente' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20' :
                                                        'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                                            }`}>
                        {apt.status}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ReceptionDashboard;