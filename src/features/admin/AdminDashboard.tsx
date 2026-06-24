import React, { useState } from 'react';
import { useAdmin } from './hooks/useAdmin';
import { UserManagementTable } from './components/UserManagementTable';

type AdminTab = 'Metrics' | 'Users';

// Inline SVGs para mantener independencia de librerías externas
const ChartIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>;
const UsersIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const CalendarCheckIcon = <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>;

const AdminDashboard: React.FC = () => {
    const { data, isLoading, isMutating, error, handleToggleUserStatus, refetch } = useAdmin();
    const [activeTab, setActiveTab] = useState<AdminTab>('Metrics');

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-1/4 bg-gray-200 rounded mb-8"></div>
                <div className="flex space-x-4 border-b border-gray-200 pb-2">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-6">
                    {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
                </div>
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
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Panel de Administración
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Supervise los ingresos de la clínica y administre los accesos del personal.
                </p>
            </div>

            {/* Navegación por Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('Metrics')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                            activeTab === 'Metrics' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Métricas de Negocio
                    </button>
                    <button
                        onClick={() => setActiveTab('Users')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                            activeTab === 'Users' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Gestión de Personal
                    </button>
                </nav>
            </div>

            {/* Renderizado Condicional del Contenido */}
            <div className="pt-4">

                {activeTab === 'Metrics' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Tarjetas de KPI */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 p-6 flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                                    {ChartIcon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Ingresos Mensuales</h3>
                                    <p className="text-2xl font-semibold text-gray-900">S/ {data.metrics.totalRevenueMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 p-6 flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                                    {CalendarCheckIcon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Citas Atendidas (Mes)</h3>
                                    <p className="text-2xl font-semibold text-gray-900">{data.metrics.totalAppointmentsMonthly}</p>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 p-6 flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-white">
                                    {UsersIcon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Nuevos Clientes</h3>
                                    <p className="text-2xl font-semibold text-gray-900">{data.metrics.newCustomersMonthly}</p>
                                </div>
                            </div>
                        </div>

                        {/* Simulación visual de Gráfico de Barras con CSS */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900 mb-6">Tendencia de Ingresos (Últimos 7 días)</h3>
                            <div className="flex items-end space-x-2 sm:space-x-8 h-48 mt-4 border-b border-gray-200 pb-2">
                                {data.metrics.revenueChartData.map((item, index) => {
                                    const maxAmount = Math.max(...data.metrics.revenueChartData.map(d => d.amount));
                                    const heightPercentage = (item.amount / maxAmount) * 100;

                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center group">
                                            <div className="relative w-full flex justify-center">
                                                {/* Tooltip Hover */}
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                                                    S/ {item.amount}
                                                </div>
                                                {/* Barra */}
                                                <div
                                                    className="w-full sm:w-12 bg-indigo-200 group-hover:bg-indigo-500 transition-colors rounded-t-sm"
                                                    style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500 mt-2 rotate-45 sm:rotate-0 origin-left">{new Date(item.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Users' && (
                    <div className="animate-in fade-in duration-300">
                        <UserManagementTable
                            users={data.users}
                            onToggleStatus={handleToggleUserStatus}
                            isMutating={isMutating}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;