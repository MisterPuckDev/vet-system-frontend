import { useState, useEffect, useCallback } from 'react';
import type { AdminData } from '../types';
import { adminService } from '../services/adminService';

export const useAdmin = () => {
    const [data, setData] = useState<AdminData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isMutating, setIsMutating] = useState<boolean>(false);

    const fetchAdminData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await adminService.getAdminData();
            setData(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado al cargar el panel de control.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
        setIsMutating(true);
        try {
            await adminService.toggleUserStatus(userId, !currentStatus);
            // Actualizamos el estado local de forma optimista
            setData((prevData) => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    users: prevData.users.map((u) =>
                        u.id === userId ? { ...u, isActive: !currentStatus } : u
                    )
                };
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message); // Notificamos el error (ej. intentar bloquear al admin master)
            }
        } finally {
            setIsMutating(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData]);

    return {
        data,
        isLoading,
        isMutating,
        error,
        handleToggleUserStatus,
        refetch: fetchAdminData
    };
};