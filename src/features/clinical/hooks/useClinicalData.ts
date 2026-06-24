import { useState, useEffect, useCallback } from 'react';
import type { ClinicalDashboardData } from '../types';
import { clinicalService } from '../services/clinicalService';

export const useClinicalData = () => {
    const [data, setData] = useState<ClinicalDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await clinicalService.getDashboardData();
            setData(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado al cargar el dashboard.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return { data, isLoading, error, refetch: fetchDashboardData };
};