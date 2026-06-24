import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReceptionData, Client, AppointmentStatus, ReceptionAppointment } from '../types';
import { receptionService } from '../services/receptionService';

export type ReceptionTab = 'Dashboard' | 'Agenda' | 'Directory';

export const useReception = () => {
    const [data, setData] = useState<ReceptionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<ReceptionTab>('Dashboard');
    const [clientSearchTerm, setClientSearchTerm] = useState<string>('');

    const fetchReceptionData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await receptionService.getReceptionData();
            setData(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado al cargar la recepción.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReceptionData();
    }, [fetchReceptionData]);

    // Filtrado de alto rendimiento para el directorio de clientes
    const filteredClients = useMemo<Client[]>(() => {
        if (!data) return [];
        if (!clientSearchTerm.trim()) return data.clients;

        const lowercasedTerm = clientSearchTerm.toLowerCase();
        return data.clients.filter((client) => {
            const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
            const matchesName = fullName.includes(lowercasedTerm);
            const matchesPhone = client.phone.includes(lowercasedTerm);
            const matchesPet = client.pets.some(pet => pet.name.toLowerCase().includes(lowercasedTerm));

            return matchesName || matchesPhone || matchesPet;
        });
    }, [data, clientSearchTerm]);

    // 1. Envolvemos las mutaciones en useCallback
    // 2. Renombramos 'data' a 'clientData' y 'appointmentData' para evitar conflictos con el estado 'data'

    const addClient = useCallback(async (clientData: Omit<Client, 'id' | 'pets'>) => {
        await receptionService.addClient(clientData);
        await fetchReceptionData();
    }, [fetchReceptionData]);

    const addAppointment = useCallback(async (appointmentData: Omit<ReceptionAppointment, 'id' | 'status'>) => {
        await receptionService.addAppointment(appointmentData);
        await fetchReceptionData();
    }, [fetchReceptionData]);

    const updateAppointmentStatus = useCallback(async (id: string, status: AppointmentStatus) => {
        await receptionService.updateAppointmentStatus(id, status);
        await fetchReceptionData();
    }, [fetchReceptionData]);

    // 3. Retornamos las funciones en el hook
    return {
        data,
        isLoading,
        error,
        activeTab,
        setActiveTab,
        clientSearchTerm,
        setClientSearchTerm,
        filteredClients,
        refetch: fetchReceptionData,
        addClient,
        addAppointment,
        updateAppointmentStatus
    };
};