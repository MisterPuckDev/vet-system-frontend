import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClinicalDashboard from './ClinicalDashboard';
import PatientRecordView from './views/PatientRecordView';

const ClinicalRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Ruta Base: El Dashboard */}
            <Route path="/" element={<ClinicalDashboard />} />

            {/* Ruta de Detalle: Ficha del Paciente */}
            <Route path="/patient/:id" element={<PatientRecordView />} />
        </Routes>
    );
};

// Exportamos por defecto para soportar el Lazy Loading en AppRouter
export default ClinicalRoutes;