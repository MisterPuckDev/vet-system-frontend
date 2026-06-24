import React from 'react';
import type {ReceptionAppointment} from '../types';

interface AgendaViewProps {
    appointments: ReceptionAppointment[];
    onUpdateStatus: (id: string, newStatus: string) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({appointments, onUpdateStatus}) => {
    // const getStatusBadge = (status: string) => {
    //     switch (status) {
    //         case 'Waiting':
    //             return <span
    //                 className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">En Sala de Espera</span>;
    //         case 'In Consultation':
    //             return <span
    //                 className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">En Consultorio</span>;
    //         case 'Scheduled':
    //             return <span
    //                 className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Programada</span>;
    //         case 'Completed':
    //             return <span
    //                 className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Finalizada</span>;
    //         default:
    //             return <span
    //                 className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{status}</span>;
    //     }
    // };

    return (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Agenda del Día</h3>
                <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                    + Nueva Cita
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-white">
                    <tr>
                        <th scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Hora
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente /
                            Mascota
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Motivo
                        </th>
                        <th scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Especialista
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span
                            className="sr-only">Acciones</span></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{apt.time}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                <div className="font-medium text-gray-900">{apt.clientName}</div>
                                <div className="text-gray-500">Mascota: <span
                                    className="font-medium text-indigo-600">{apt.petName}</span></div>
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{apt.reason}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{apt.veterinarian}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm"><select
                                value={apt.status}
                                onChange={(e) => onUpdateStatus(apt.id, e.target.value as any)}
                                className="text-sm border-gray-300 rounded-md font-medium text-indigo-700 bg-indigo-50 py-1 pl-2 pr-6"
                            >
                                <option value="Scheduled">Programada</option>
                                <option value="Waiting">En Espera</option>
                                <option value="In Consultation">En Consultorio</option>
                                <option value="Completed">Finalizada</option>
                            </select></td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button className="text-indigo-600 hover:text-indigo-900">Actualizar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};