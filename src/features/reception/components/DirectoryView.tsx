import React from 'react';
import type { Client } from '../types';

interface DirectoryViewProps {
    clients: Client[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ clients, searchTerm, onSearchChange }) => {
    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white p-4 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Buscar por cliente, teléfono o nombre de mascota..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <button className="w-full sm:w-auto rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                    Registrar Cliente
                </button>
            </div>

            {/* Directory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-sm text-gray-500 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                        No se encontraron clientes que coincidan con su búsqueda.
                    </div>
                ) : (
                    clients.map((client) => (
                        <div key={client.id} className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900">{client.firstName} {client.lastName}</h4>
                                <div className="mt-2 space-y-1 text-sm text-gray-500">
                                    <p className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                                        {client.phone}
                                    </p>
                                    <p className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                                        {client.email}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mascotas</span>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {client.pets.map(pet => (
                                            <span key={pet.id} className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        {pet.name} ({pet.species})
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-4">
                                <button className="w-full text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-lg transition-colors">
                                    Ver Ficha Completa
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};