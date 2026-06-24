import React from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { useReception } from './hooks/useReception';
import { AgendaView } from './components/AgendaView';
import { DirectoryView } from './components/DirectoryView';

// Iconos en línea
const CalendarIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const ClockIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const ReceptionDashboard: React.FC = () => {
    const { user } = useAuth();
    const {
        data,
        isLoading,
        error,
        activeTab,
        setActiveTab,
        clientSearchTerm,
        setClientSearchTerm,
        filteredClients,
        refetch
    } = useReception();

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-1/4 bg-gray-200 rounded mb-8"></div>
                <div className="flex space-x-4 border-b border-gray-200 pb-2">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded-xl mt-6"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                <button onClick={refetch} className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500">
                    Reintentar conexión
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Cabecera */}
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Recepción - Hola, {user?.firstName}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Gestione las citas del día, controle la sala de espera y acceda al directorio de clientes.
                </p>
            </div>

            {/* Navegación por Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('Dashboard')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                            activeTab === 'Dashboard' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Resumen del Día
                    </button>
                    <button
                        onClick={() => setActiveTab('Agenda')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                            activeTab === 'Agenda' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Agenda Médica
                    </button>
                    <button
                        onClick={() => setActiveTab('Directory')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                            activeTab === 'Directory' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Directorio de Clientes
                    </button>
                </nav>
            </div>

            {/* Renderizado Condicional del Contenido */}
            <div className="pt-4">

                {activeTab === 'Dashboard' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* KPIs de Recepción */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 p-6 flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                                    {CalendarIcon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Citas de Hoy</h3>
                                    <p className="text-2xl font-semibold text-gray-900">{data.metrics.todayTotalAppointments}</p>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-orange-50 p-6 flex items-center relative">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white">
                                    {ClockIcon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-orange-800">En Sala de Espera</h3>
                                    <p className="text-2xl font-semibold text-orange-900">{data.metrics.waitingRoomCount}</p>
                                </div>
                                {data.metrics.waitingRoomCount > 0 && (
                                    <span className="absolute top-4 right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                                )}
                            </div>

                            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-green-50 p-6 flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                                    {CheckIcon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-green-800">Atendidos</h3>
                                    <p className="text-2xl font-semibold text-green-900">{data.metrics.completedAppointments}</p>
                                </div>
                            </div>
                        </div>

                        {/* Acceso Rápido a Próximas Citas */}
                        <div className="mt-8">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Próximos Ingresos (Vista Rápida)</h3>
                            <AgendaView appointments={data.todayAppointments.slice(0, 3)} />
                        </div>
                    </div>
                )}

                {activeTab === 'Agenda' && (
                    <div className="animate-in fade-in duration-300">
                        <AgendaView appointments={data.todayAppointments} />
                    </div>
                )}

                {activeTab === 'Directory' && (
                    <div className="animate-in fade-in duration-300">
                        <DirectoryView
                            clients={filteredClients}
                            searchTerm={clientSearchTerm}
                            onSearchChange={setClientSearchTerm}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default ReceptionDashboard;