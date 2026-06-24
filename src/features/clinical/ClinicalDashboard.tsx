import React from 'react';
import {useClinicalData} from './hooks/useClinicalData';

export const ClinicalDashboard: React.FC = () => {
    // Consumo de datos a través del Custom Hook para mantener la UI limpia de lógica de red
    const {dashboardData, isLoading, error, refreshData} = useClinicalData();

    // Estado de carga visual estructurado con Skeletons reactivos
    if (isLoading) {
        return (
            <div className="p-6 space-y-6 bg-slate-50 min-h-screen animate-pulse">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-3">
                        <div className="h-7 w-64 bg-slate-200 rounded-lg"></div>
                        <div className="h-4 w-48 bg-slate-200 rounded-lg"></div>
                    </div>
                    <div className="h-10 w-32 bg-slate-200 rounded-lg"></div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n}
                             className="h-28 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-20 bg-slate-200 rounded"></div>
                                <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                            </div>
                            <div className="h-8 w-16 bg-slate-200 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Main Content Skeleton */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
                    <div className="lg:col-span-2 h-96 bg-white border border-slate-200 rounded-2xl shadow-sm"></div>
                    <div className="h-96 bg-white border border-slate-200 rounded-2xl shadow-sm"></div>
                </div>
            </div>
        );
    }

    // Manejo de errores amigable y visual para el personal clínico
    if (error) {
        return (
            <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">
                <div
                    className="max-w-md w-full bg-white border border-red-100 rounded-2xl p-6 shadow-xl text-center space-y-4">
                    <div
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-2">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-950">Error al cargar el Dashboard</h3>
                    <p className="text-sm text-slate-600">No pudimos conectar con los servicios médicos. Por favor
                        verifica tu conexión de red local.</p>
                    <button
                        onClick={refreshData}
                        className="inline-flex justify-center items-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors w-full"
                    >
                        Reintentar Conexión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen text-slate-900">
            {/* Encabezado Superior con Identidad y Saludo */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                        Panel de Control Clínico
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                        Bienvenido de vuelta. Aquí está el estado médico de la sucursal de hoy.
                    </p>
                </div>
                <div>
                    <button
                        onClick={refreshData}
                        className="inline-flex items-center gap-2 justify-center rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                    >
                        <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18"/>
                        </svg>
                        Sincronizar
                    </button>
                </div>
            </div>

            {/* Módulo 1: Cuadrícula de Tarjetas de Indicadores Médicos (Stats Grid) */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Tarjeta: Citas del Día */}
                <div
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500">Citas de Hoy</span>
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M8 7V3m8 3V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span
                            className="text-3xl font-bold tracking-tight text-slate-950">{dashboardData?.summary?.todayAppointments || 0}</span>
                        <span
                            className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Activas</span>
                    </div>
                </div>

                {/* Tarjeta: Pacientes Hospitalizados */}
                <div
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500">Hospitalizados</span>
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span
                            className="text-3xl font-bold tracking-tight text-slate-950">{dashboardData?.summary?.hospitalizedCount || 0}</span>
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">En observación</span>
                    </div>
                </div>

                {/* Tarjeta: Cirugías Agendadas */}
                <div
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500">Cirugías Quirúrgicas</span>
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 00-2 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span
                            className="text-3xl font-bold tracking-tight text-slate-950">{dashboardData?.scheduledSurgeriesCount || 0}</span>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Para hoy</span>
                    </div>
                </div>

                {/* Tarjeta: Alertas de Medicamentos / Stock Crítico */}
                <div
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500">Alertas de Stock</span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span
                            className="text-3xl font-bold tracking-tight text-slate-950">{dashboardData?.lowStockAlertsCount || 0}</span>
                        <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">Insumos críticos</span>
                    </div>
                </div>
            </div>

            {/* Módulo Central: Agenda y Accesos Directos de Eficiencia */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Columna Izquierda (2/3 de ancho): Tabla de Consultas del Día */}
                <div
                    className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                        <div>
                            <h2 className="text-lg font-bold text-slate-950">Próximos Pacientes del Día</h2>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">Listado cronológico de pacientes
                                agendados para revisión.</p>
                        </div>
                        <span
                            className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-2000">
                                Hoy
                            </span>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Hora</th>
                                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Mascota
                                    / Especie
                                </th>
                                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Propietario</th>
                                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Motivo
                                    de Consulta
                                </th>
                                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Estado</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {dashboardData?.appointments && dashboardData.appointments.length > 0 ? (
                                dashboardData.appointments.map((appointment) => (
                                    <tr key={appointment.id}
                                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-950 whitespace-nowrap">
                                            {appointment.time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                        <span
                                                            className="text-sm font-bold text-slate-950 group-hover:text-emerald-600 transition-colors">
                                                            {appointment.patient.name}
                                                        </span>
                                                <span className="text-xs font-medium text-slate-500">
                                                            {appointment.patient.breed} • {appointment.patient.species}
                                                        </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">
                                            {appointment.patient.ownerName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                                            {appointment.reason}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold border ${
                                                            appointment.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                                appointment.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                                                    'bg-amber-50 text-amber-700 border-amber-200'
                                                        }`}>
                                                        {appointment.status === 'Completed' ? 'Completado' :
                                                            appointment.status === 'In Progress' ? 'En Consulta' : 'En Espera'}
                                                    </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}
                                        className="px-6 py-12 text-center text-sm font-medium text-slate-400 bg-white">
                                        No hay consultas agendadas para el resto del día.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Columna Derecha (1/3 de ancho): Panel de Acciones Clínicas y Alertas Crónicas */}
                <div className="space-y-6">
                    {/* Bloque A: Accesos Clínicos Rápidos */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-base font-bold text-slate-950 mb-4">Acciones Médicas Rápidas</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all group">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 4v16m8-8H4"/>
                                    </svg>
                                </div>
                                Nueva Consulta Médica
                            </button>
                            <button
                                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all group">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                </div>
                                Emitir Receta / Certificado
                            </button>
                            <button
                                className="flex w-full items-center gap-3 rounded-xl border border-rose-100 bg-rose-50/30 px-4 py-3 text-left text-sm font-bold text-rose-700 hover:bg-rose-50 transition-all group">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                    </svg>
                                </div>
                                Ingreso por Emergencia
                            </button>
                        </div>
                    </div>

                    {/* Bloque B: Monitoreo de Casos Crónicos / Empatía UX */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-slate-950">Pacientes de Cuidado Crónico</h3>
                            <span
                                className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">Alertas</span>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-bold text-slate-950">Max (Canino)</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan Renal</span>
                                </div>
                                <p className="text-xs text-slate-600 mt-1">Requiere recordatorio de alimento medicado y
                                    control de creatinina.</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-bold text-slate-950">Luna (Felino)</span>
                                    <span
                                        className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Insulina</span>
                                </div>
                                <p className="text-xs text-slate-600 mt-1">Dosis de control AM completada. Pendiente
                                    llamada de seguimiento.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};