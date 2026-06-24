import { useState, useEffect, useCallback } from 'react';
import type { PatientDetails } from '../types';
import { clinicalService } from '../services/clinicalService';

export const usePatientDetails = (patientId: string | undefined) => {
    const [details, setDetails] = useState<PatientDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDetails = useCallback(async () => {
        if (!patientId) return;

        setIsLoading(true);
        setError(null);
        try {
            const result = await clinicalService.getPatientDetails(patientId);
            setDetails(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error al cargar el expediente del paciente.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [patientId]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);

    return { details, isLoading, error, refetch: fetchDetails };
};