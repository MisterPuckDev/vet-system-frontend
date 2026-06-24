import { useState, useEffect, useCallback } from 'react';
import type { ClinicalDashboardData } from '../types';
import { clinicalService } from '../services/clinicalService';

export const useClinicalData = () => {
    // 1. Renombramos 'data' a 'dashboardData' para mayor claridad semántica
    const [dashboardData, setDashboardData] = useState<ClinicalDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Renombramos 'fetchDashboardData' a 'refreshData' para coincidir con la UI
    const refreshData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await clinicalService.getDashboardData();
            setDashboardData(result);
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
        refreshData();
    }, [refreshData]);

    // 3. Exportamos exactamente los nombres que el componente ClinicalDashboard espera
    return { dashboardData, isLoading, error, refreshData };
};