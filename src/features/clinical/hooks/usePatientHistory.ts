// src/features/clinical/hooks/usePatientHistory.ts
import { useState, useEffect } from 'react';
import { mockFelineCKDPatient } from "../api/patientMocks.ts";
import type { Patient } from "../api/patientMocks.ts";

// Interfaz estricta para el retorno del hook
interface UsePatientHistoryResult {
    patient: Patient | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | null;
}

export const usePatientHistory = (patientId: string | undefined): UsePatientHistoryResult => {
    // 1. Declaración estricta de todos los estados requeridos
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // 2. Validación temprana del parámetro dinámico de la ruta
        if (!patientId) {
            setIsError(true);
            setErrorMessage('ID de paciente no proporcionado en la ruta.');
            setIsLoading(false);
            return; // Interrumpe la ejecución si no hay ID
        }

        const fetchPatientData = async () => {
            // 3. Reinicio de estados antes de la petición
            setIsLoading(true);
            setIsError(false);
            setErrorMessage(null);

            try {
                // Simulación de latencia de red (Llamada a la API en Java)
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Simulación de búsqueda en base de datos
                if (patientId === 'p-1029' || patientId === '1029') {
                    setPatient(mockFelineCKDPatient);
                } else {
                    // Si el ID no coincide con nuestro mock, forzamos un error controlado
                    throw new Error('Paciente no encontrado en la base de datos.');
                }
            } catch (err: unknown) {
                // 4. Manejo estricto de errores con TypeScript
                setIsError(true);
                if (err instanceof Error) {
                    setErrorMessage(err.message);
                } else {
                    setErrorMessage('Error de conexión desconocido al cargar la historia clínica.');
                }
            } finally {
                // 5. Finalización del estado de carga, independientemente del resultado
                setIsLoading(false);
            }
        };

        fetchPatientData();
    }, [patientId]); // El hook reaccionará si el ID cambia en la URL

    // 6. Retorno del objeto tipado
    return { patient, isLoading, isError, errorMessage };
};