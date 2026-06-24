import { useState, useEffect, useCallback } from 'react';
import type { CustomerDashboardData } from '../types';
import { portalService } from '../services/portalService';

export const useCustomerPortal = () => {
    const [data, setData] = useState<CustomerDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await portalService.getDashboardData();
            setData(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado al conectar con el portal.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
};