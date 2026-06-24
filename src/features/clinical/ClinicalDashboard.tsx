import React from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { useClinicalData } from './hooks/useClinicalData';
import { StatCard } from './components/StatCard';
import { AppointmentTable } from './components/AppointmentTable';

// Iconos SVG en línea específicos del dominio médico
const CalendarIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const AlertIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const PillIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;

const ClinicalDashboard: React.FC = () => {
    const { user } = useAuth();
    const { data, isLoading, error, refetch } = useClinicalData();

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                    ))}
                </div>
                <div className="h-64 bg-gray-200 rounded-xl mt-8"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                <button onClick={refetch} className="mt-2 text-sm font-medium text-red-600 hover:text-red-500">
                    Intentar nuevamente
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Cabecera del Dashboard */}
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Bienvenido, Dr/a. {user?.lastName}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Resumen clínico del día. Tiene {data?.summary.todayAppointments} citas programadas.
                </p>
            </div>

            {/* Tarjetas de Resumen (Stats) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Citas de Hoy"
                    value={data?.summary.todayAppointments || 0}
                    description="Pacientes agendados"
                    iconBgColor="bg-indigo-500"
                    icon={CalendarIcon}
                />
                <StatCard
                    title="Casos Críticos"
                    value={data?.summary.criticalPatients || 0}
                    description="Requieren seguimiento"
                    iconBgColor="bg-red-500"
                    icon={AlertIcon}
                />
                <StatCard
                    title="Recetas Pendientes"
                    value={data?.summary.pendingPrescriptions || 0}
                    description="Por autorizar en farmacia"
                    iconBgColor="bg-teal-500"
                    icon={PillIcon}
                />
            </div>

            {/* Sección Inferior: Agenda y Recetas Recientes */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Tabla de Citas (Ocupa 2/3 en escritorio) */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Agenda Médica</h3>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Ver calendario completo &rarr;</button>
                    </div>
                    {data?.appointments && <AppointmentTable appointments={data.appointments} />}
                </div>

                {/* Lista de Recetas Recientes (Ocupa 1/3 en escritorio) */}
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Últimas Recetas Emitidas</h3>
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
                        <ul role="list" className="divide-y divide-gray-200">
                            {data?.recentPrescriptions.map((rx) => (
                                <li key={rx.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex space-x-3">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium text-gray-900">{rx.medication}</h4>
                                                <p className="text-xs text-gray-500">{rx.date}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Paciente: <span className="font-medium text-gray-700">{rx.patientName}</span></p>
                                            <p className="text-xs text-gray-400 mt-0.5">Dosis: {rx.dosage}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                            <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Nueva Receta
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ClinicalDashboard;