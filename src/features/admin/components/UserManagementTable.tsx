import React from 'react';
import type { SystemUser } from '../types';

interface UserManagementTableProps {
    users: SystemUser[];
    onToggleStatus: (userId: string, currentStatus: boolean) => void;
    isMutating: boolean;
}

export const UserManagementTable: React.FC<UserManagementTableProps> = ({ users, onToggleStatus, isMutating }) => {

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'Administrator': return <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">Administrador</span>;
            case 'Veterinarian': return <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Veterinario</span>;
            case 'Receptionist': return <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10">Recepción</span>;
            default: return <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{role}</span>;
        }
    };

    return (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Personal del Sistema</h3>
                    <p className="mt-1 text-sm text-gray-500">Gestione los accesos y roles de los empleados de la clínica.</p>
                </div>
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    + Nuevo Usuario
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre y Correo</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rol</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Último Acceso</th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Estado</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                                        <div className="text-gray-500 text-sm">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getRoleBadge(user.role)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {new Date(user.lastLogin).toLocaleDateString()} {new Date(user.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {user.isActive ? 'Activo' : 'Bloqueado'}
                  </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                    onClick={() => onToggleStatus(user.id, user.isActive)}
                                    disabled={isMutating}
                                    className={`${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} focus:outline-none disabled:opacity-50`}
                                >
                                    {user.isActive ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};