// src/features/clinical/pages/PatientClinicalHistory.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatientHistory } from '../hooks/usePatientHistory';

const PatientClinicalHistory: React.FC = () => {
    // 1. Extraemos el ID dinámico de la URL configurada en AppRouter
    const { patientId } = useParams<{ patientId: string }>();
    const navigate = useNavigate();

    // 2. Consumimos nuestro Custom Hook tipado
    const { patient, isLoading, isError, errorMessage } = usePatientHistory(patientId);

    // ==========================================
    // MANEJO DE ESTADOS DE CARGA Y ERROR
    // ==========================================
    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-40 animate-pulse">
                    <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse"></div>
                <p className="text-center text-gray-500 font-medium animate-pulse mt-4">
                    Cargando historia clínica del paciente...
                </p>
            </div>
        );
    }

    if (isError || !patient) {
        return (
            <div className="max-w-5xl mx-auto p-6">
                <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl shadow-sm">
                    <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Error al cargar el expediente
                    </h2>
                    <p className="text-red-700 mt-2">{errorMessage || 'No se pudo cargar la información del paciente.'}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-white text-red-700 border border-red-200 rounded-lg hover:bg-red-50 font-medium transition-colors"
                    >
                        Volver atrás
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // RENDERIZADO PRINCIPAL DE LA UI
    // ==========================================
    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">

            {/* --- SECCIÓN 1: CABECERA Y ALERTA DE ALERGIAS --- */}
            <header className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Alerta Crítica Visual (Alergias) */}
                {patient.allergies.length > 0 && (
                    <div className="bg-red-600 px-6 py-3 flex items-start sm:items-center gap-3 text-white">
                        <svg className="w-6 h-6 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <span className="font-bold uppercase tracking-wider text-sm block sm:inline mr-2">¡Alerta Médica!</span>
                            <span className="font-medium text-red-100">
                Paciente alérgico a: {patient.allergies.join(', ')}
              </span>
                        </div>
                    </div>
                )}

                {/* Información General */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            {patient.name}
                            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold uppercase tracking-wide">
                ID: {patient.id}
              </span>
                        </h1>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-600">
                            <p><strong className="text-gray-900">Especie:</strong> {patient.species}</p>
                            <p><strong className="text-gray-900">Raza:</strong> {patient.breed}</p>
                            <p><strong className="text-gray-900">Edad:</strong> {patient.age}</p>
                            <p><strong className="text-gray-900">Peso:</strong> {patient.weightKg} kg</p>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors whitespace-nowrap">
                        + Registrar Consulta
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* --- SECCIÓN 2: HISTORIAL DE CONSULTAS (Columna Principal) --- */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Historial Clínico
                        </h2>

                        <div className="space-y-6">
                            {patient.consultationHistory.length === 0 ? (
                                <p className="text-gray-500 italic">No hay consultas registradas para este paciente.</p>
                            ) : (
                                patient.consultationHistory.map((consult) => (
                                    <article key={consult.id} className="relative pl-6 border-l-2 border-blue-200 hover:border-blue-500 transition-colors">
                                        {/* Punto indicador de la línea de tiempo */}
                                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{consult.reason}</h3>
                                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {consult.date}
                      </span>
                                        </div>

                                        <div className="space-y-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 mt-2">
                                            <div>
                                                <span className="block font-bold text-gray-900 mb-1">Anamnesis:</span>
                                                <p className="leading-relaxed">{consult.anamnesis}</p>
                                            </div>
                                            <div className="pt-2 border-t border-gray-200">
                                                <span className="block font-bold text-gray-900 mb-1">Diagnóstico:</span>
                                                <p className="text-blue-900 font-medium">{consult.diagnosis}</p>
                                            </div>
                                        </div>

                                        <p className="text-xs font-medium text-gray-400 mt-2 text-right">
                                            Atendido por: {consult.veterinarian}
                                        </p>
                                    </article>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* --- SECCIÓN 3: PLAN MÉDICO (Columna Lateral) --- */}
                <aside className="space-y-6">
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Plan Médico Actual
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Dieta Prescrita</h3>
                                <div className="bg-green-50 text-green-800 p-3 rounded-lg border border-green-100 text-sm font-medium">
                                    {patient.medicalPlan.currentDiet}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Medicación Activa</h3>
                                <ul className="space-y-2">
                                    {patient.medicalPlan.activeMedications.length === 0 ? (
                                        <li className="text-sm text-gray-500 italic">Sin medicación actual.</li>
                                    ) : (
                                        patient.medicalPlan.activeMedications.map((med, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-2.5 rounded border border-gray-100">
                                                <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{med}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Próximo Control</h3>
                                <p className="text-lg font-bold text-gray-900">{patient.medicalPlan.nextCheckup}</p>
                            </div>
                        </div>
                    </section>
                </aside>

            </div>
        </div>
    );
};

// Exportación única por defecto exigida por Vite Fast Refresh
export default PatientClinicalHistory;