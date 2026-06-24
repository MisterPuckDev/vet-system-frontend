import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatientDetails } from '../hooks/usePatientDetails';

type Tab = 'History' | 'Vaccines' | 'Labs';

export const PatientRecordView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { details, isLoading, error } = usePatientDetails(id);
    const [activeTab, setActiveTab] = useState<Tab>('History');

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6 p-6">
                <div className="h-4 w-24 bg-gray-200 rounded mb-8"></div>
                <div className="h-32 bg-white border border-gray-100 rounded-xl shadow-sm"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
        );
    }

    if (error || !details) {
        return (
            <div className="rounded-md bg-red-50 p-4 border border-red-200 m-6">
                <h3 className="text-sm font-medium text-red-800">{error || 'Paciente no encontrado'}</h3>
                <button onClick={() => navigate('/clinical')} className="mt-4 text-sm font-medium text-red-600 hover:text-red-500">
                    &larr; Volver a la Agenda
                </button>
            </div>
        );
    }

    const { patient, history, vaccines, labResults } = details;

    return (
        <div className="space-y-6">
            {/* Botón Volver */}
            <div>
                <button
                    onClick={() => navigate('/clinical')}
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Volver a Dashboard Clínico
                </button>
            </div>

            {/* Tarjeta de Información Principal del Paciente */}
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {patient.name}
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            {patient.species} - {patient.breed} | Dueño: {patient.ownerName}
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex space-x-6 text-sm text-gray-600">
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">Edad</span>
                            <span>{patient.age}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">Peso</span>
                            <span>{patient.weight}</span>
                        </div>
                    </div>
                </div>

                {patient.allergies && patient.allergies.length > 0 && (
                    <div className="mt-4 flex items-center">
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              Alergias: {patient.allergies.join(', ')}
            </span>
                    </div>
                )}
            </div>

            {/* Navegación por Pestañas */}
            <div>
                <div className="sm:hidden">
                    <select
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value as Tab)}
                    >
                        <option value="History">Historial Médico</option>
                        <option value="Vaccines">Vacunas</option>
                        <option value="Labs">Exámenes y Laboratorio</option>
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {([
                                { id: 'History', label: 'Historial Médico' },
                                { id: 'Vaccines', label: 'Vacunas' },
                                { id: 'Labs', label: 'Laboratorio' },
                            ] as { id: Tab; label: string }[]).map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                    ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                  `}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Contenido Dinámico de las Pestañas */}
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">

                {activeTab === 'History' && (
                    <ul role="list" className="divide-y divide-gray-200">
                        {history.map((record) => (
                            <li key={record.id} className="py-4">
                                <div className="flex justify-between">
                                    <h4 className="text-sm font-semibold text-gray-900">{record.date} - {record.reason}</h4>
                                    <p className="text-sm text-gray-500">{record.veterinarian}</p>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    <p><strong className="text-gray-800">Diagnóstico:</strong> {record.diagnosis}</p>
                                    <p className="mt-1"><strong className="text-gray-800">Tratamiento:</strong> {record.treatment}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === 'Vaccines' && (
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Vacuna</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aplicación</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Próxima Dosis</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Veterinario</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {vaccines.map((vax) => (
                            <tr key={vax.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{vax.name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vax.applicationDate}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-indigo-600">{vax.nextDueDate}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vax.appliedBy}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'Labs' && (
                    <ul role="list" className="divide-y divide-gray-200">
                        {labResults.map((lab) => (
                            <li key={lab.id} className="py-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-semibold text-gray-900">{lab.testName}</h4>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                    ${lab.result === 'Normal' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
                  `}>
                    {lab.result}
                  </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    <p><strong>Fecha:</strong> {lab.date}</p>
                                    <p className="mt-1"><strong>Observaciones:</strong> {lab.notes}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    );
};

export default PatientRecordView;