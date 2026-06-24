import React from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { useCustomerPortal } from './hooks/useCustomerPortal';

// Añadimos aria-hidden="true" a los íconos para mejorar la accesibilidad
const PawIcon = <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500 inline-block ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CalendarIcon = <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>;
const HeartIcon = <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;

// Pequeño helper para fechas seguras
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Fecha por confirmar' : date.toLocaleDateString();
};

const CustomerPortal: React.FC = () => {
    const { user } = useAuth();
    const { data, isLoading, error, refetch } = useCustomerPortal();

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-8 max-w-5xl mx-auto">
                <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>)}
                </div>
                <div className="h-64 bg-gray-200 rounded-2xl mt-8"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-red-50 p-6 border border-red-200 text-center">
                <h3 className="text-lg font-medium text-red-800 mb-2">{error || 'No se pudieron cargar los datos.'}</h3>
                <p className="text-sm text-red-600 mb-4">Si el problema persiste, contáctenos por teléfono.</p>
                <button onClick={refetch} className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                    Volver a cargar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-10">

            {/* Cabecera Cálida */}
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl flex items-center">
                    ¡Hola, {user?.firstName}! {PawIcon} {/* Integración del ícono olvidado */}
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-500">
                    Bienvenido al espacio de salud de su familia peluda.
                </p>
            </div>

            {/* Sección 1: Mis Mascotas */}
            <section>
                <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700 mr-3">
                        {HeartIcon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Mis Mascotas</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.pets.map(pet => (
                        <div key={pet.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="flex items-center space-x-4">
                                <div className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner ${pet.avatarColor}`}>
                                    {pet.name.charAt(0).toUpperCase()} {/* Garantiza que la inicial sea mayúscula */}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{pet.name}</h4>
                                    <p className="text-sm text-gray-500">{pet.species === 'Dog' ? 'Perro' : 'Gato'} • {pet.breed}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <span className="block text-gray-500 text-xs font-medium mb-1">Edad</span>
                                    <span className="font-semibold text-gray-900">{pet.age}</span>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <span className="block text-gray-500 text-xs font-medium mb-1">Peso</span>
                                    <span className="font-semibold text-gray-900">{pet.weight}</span>
                                </div>
                            </div>

                            {pet.nextVaccineDate && (
                                <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                    <span className="mr-2">Próxima Vacuna:</span>
                                    {formatDate(pet.nextVaccineDate)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Sección 2: Próximas Citas */}
                <section>
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-700 mr-3">
                            {CalendarIcon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Citas Programadas</h3>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {data.upcomingAppointments.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No tiene citas programadas próximamente.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {data.upcomingAppointments.map(apt => (
                                    <li key={apt.id} className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-semibold text-indigo-600">{apt.date} a las {apt.time}</p>
                                                <p className="mt-1 font-bold text-gray-900 text-lg">Cita para {apt.petName}</p>
                                                <p className="mt-1 text-sm text-gray-500">{apt.reason}</p>
                                                <p className="mt-2 text-xs font-medium text-gray-400">Atiende: {apt.veterinarian}</p>
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-800 border border-yellow-200">
                                                Confirmada
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="bg-gray-50 p-4 border-t border-gray-100">
                            <button className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Agendar nueva cita
                            </button>
                        </div>
                    </div>
                </section>

                {/* Sección 3: Recetas y Cuidados */}
                <section>
                    <div className="flex items-center mb-4">
                        <div className="bg-teal-100 p-2 rounded-lg text-teal-700 mr-3">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Recetas Activas</h3>
                    </div>

                    <div className="space-y-4">
                        {data.activePrescriptions.map(rx => (
                            <div key={rx.id} className={`p-6 rounded-2xl border ${rx.isChronic ? 'bg-orange-50/50 border-orange-100' : 'bg-white border-gray-100 shadow-sm'}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-gray-900 text-lg pr-4">{rx.medication}</h4>
                                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
                                        {rx.petName}
                                    </span>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm mb-3">
                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                        "{rx.instructions}"
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-xs text-gray-500">Recetado el {formatDate(rx.issuedDate)} por {rx.veterinarian}</p>
                                </div>
                            </div>
                        ))}
                        {data.activePrescriptions.length === 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                                No hay tratamientos activos.
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default CustomerPortal;