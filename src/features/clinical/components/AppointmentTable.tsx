import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Appointment } from '../types';

interface AppointmentTableProps {
    appointments: Appointment[];
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
    const navigate = useNavigate();

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Completed': return <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Completada</span>;
            case 'In Progress': return <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">En Progreso</span>;
            case 'Scheduled': return <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Programada</span>;
            default: return <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{status}</span>;
        }
    };

    const renderedRows = useMemo(() => {
        return appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="font-medium text-gray-900">{apt.patient.name}</div>
                    <div className="text-gray-500">{apt.patient.species} - {apt.patient.breed}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{apt.time}</td>
                <td className="px-3 py-4 text-sm text-gray-500 truncate max-w-[200px]">{apt.reason}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getStatusBadge(apt.status)}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {/* Navegación acoplada a la ruta anidada */}
                    <button
                        onClick={() => navigate(`/clinical/patient/${apt.patient.id}`)}
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                    >
                        Ver Ficha<span className="sr-only">, {apt.patient.name}</span>
                    </button>
                </td>
            </tr>
        ));
    }, [appointments, navigate]);

    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-300 bg-white">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Paciente</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Hora</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Motivo</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {renderedRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};