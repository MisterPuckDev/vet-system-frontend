import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Client, ReceptionAppointment } from '../types';

interface AppointmentModalProps {
    isOpen: boolean;
    clients: Client[];
    onClose: () => void;
    onSave: (data: Omit<ReceptionAppointment, 'id' | 'status'>) => Promise<void>;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, onSave }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    if (!isOpen) return null;

    const handleClose = () => { reset(); onClose(); };

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            await onSave({
                clientName: data.clientName,
                petName: data.petName,
                reason: data.reason,
                time: data.time,
                veterinarian: data.veterinarian
            });
            handleClose();
        } finally { setIsSubmitting(false); }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Fondo Glassmorphism Ligero */}
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity" onClick={handleClose}></div>
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
                    <h3 className="text-xl font-bold mb-4">Nueva Cita</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Cliente</label>
                            <input type="text" {...register('clientName', { required: true })} className="w-full mt-1 border-gray-300 rounded-md" placeholder="Ej. Ana Garcia" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mascota</label>
                            <input type="text" {...register('petName', { required: true })} className="w-full mt-1 border-gray-300 rounded-md" placeholder="Ej. Luna" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Hora</label>
                                <input type="time" {...register('time', { required: true })} className="w-full mt-1 border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Veterinario</label>
                                <select {...register('veterinarian')} className="w-full mt-1 border-gray-300 rounded-md">
                                    <option>Dra. Laura Gomez</option>
                                    <option>Dr. Roberto Santos</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Motivo</label>
                            <textarea {...register('reason', { required: true })} rows={2} className="w-full mt-1 border-gray-300 rounded-md"></textarea>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={handleClose} className="text-gray-600 font-medium">Cancelar</button>
                            <button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
                                Guardar Cita
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};