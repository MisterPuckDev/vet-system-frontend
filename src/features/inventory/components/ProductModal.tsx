import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Product } from '../types';

interface ProductModalProps {
    isOpen: boolean;
    initialData?: Product | null;
    onClose: () => void;
    onSave: (data: Omit<Product, 'id'>, id?: string) => Promise<void>;
}

type ProductFormData = Omit<Product, 'id'>;

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, initialData, onClose, onSave }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const defaultValues = { category: 'Medication', price: 0, stock: 0, minStock: 5 };
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({ defaultValues });

    // Sincroniza el formulario si es edición o nuevo
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset(defaultValues);
        }
    }, [initialData, isOpen, reset]);

    if (!isOpen) return null;

    const handleClose = () => {
        reset(defaultValues);
        setServerError(null);
        onClose();
    };

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        setServerError(null);
        try {
            const formattedData: ProductFormData = {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
                minStock: Number(data.minStock),
                expirationDate: data.expirationDate || undefined
            };
            await onSave(formattedData, initialData?.id);
            handleClose();
        } catch (err: any) {
            setServerError(err.message || 'Error al guardar.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* FIX APLICADO: bg-slate-900/20 backdrop-blur-md para un Glassmorphism ligero en lugar de negro */}
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity" onClick={isSubmitting ? undefined : handleClose}></div>
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                        <h3 className="text-xl font-semibold leading-6 text-gray-900">
                            {initialData ? 'Editar Producto' : 'Registrar Nuevo Producto'}
                        </h3>
                        <button onClick={handleClose} disabled={isSubmitting} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {serverError && (
                            <div className="rounded-md bg-red-50 p-4 border border-red-200">
                                <p className="text-sm font-medium text-red-800">{serverError}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-900">SKU / Código</label>
                                <input type="text" {...register('sku', { required: 'Obligatorio' })} disabled={isSubmitting || !!initialData} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm disabled:bg-gray-100" />
                                {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Categoría</label>
                                <select {...register('category')} disabled={isSubmitting} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                    <option value="Medication">Medicamento</option>
                                    <option value="Food">Alimento</option>
                                    <option value="Accessory">Accesorio</option>
                                    <option value="Supplies">Insumo Médico</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">Nombre del Producto</label>
                                <input type="text" {...register('name', { required: 'Obligatorio' })} disabled={isSubmitting} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Precio (S/)</label>
                                <input type="number" step="0.01" {...register('price', { required: 'Obligatorio' })} disabled={isSubmitting} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Vencimiento</label>
                                <input type="date" {...register('expirationDate')} disabled={isSubmitting} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Stock Actual</label>
                                <input type="number" {...register('stock', { required: 'Obligatorio' })} disabled={isSubmitting} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900">Stock Mínimo</label>
                                <input type="number" {...register('minStock', { required: 'Obligatorio' })} disabled={isSubmitting} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-x-4 border-t border-gray-200 pt-6">
                            <button type="button" onClick={handleClose} disabled={isSubmitting} className="text-sm font-semibold text-gray-900">Cancelar</button>
                            <button type="submit" disabled={isSubmitting} className="rounded-md px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors">
                                {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};