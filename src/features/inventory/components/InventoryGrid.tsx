import React from 'react';
import type { Product } from '../types';

interface InventoryGridProps {
    products: Product[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    categoryFilter: string;
    setCategoryFilter: (category: string) => void;
    onAddProductClick: () => void;
    // 1. Agregamos la propiedad faltante a la interfaz
    onEditProductClick: (product: Product) => void;
}

export const InventoryGrid: React.FC<InventoryGridProps> = ({
                                                                products,
                                                                searchTerm,
                                                                setSearchTerm,
                                                                categoryFilter,
                                                                setCategoryFilter,
                                                                onAddProductClick,
                                                                onEditProductClick // 2. La desestructuramos de las props
                                                            }) => {

    const getStockBadge = (stock: number, minStock: number) => {
        if (stock === 0) {
            return <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Agotado</span>;
        }
        if (stock <= minStock) {
            return <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Stock Bajo</span>;
        }
        return <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Óptimo</span>;
    };

    return (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">

            {/* Barra de Herramientas (Filtros y Acciones) */}
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex flex-1 space-x-4">
                    <div className="relative w-full max-w-xs">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Buscar por SKU o Nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="block w-48 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="All">Todas las Categorías</option>
                        <option value="Medication">Medicamentos</option>
                        <option value="Food">Alimentos</option>
                        <option value="Accessory">Accesorios</option>
                        <option value="Supplies">Insumos</option>
                    </select>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={onAddProductClick}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                    >
                        + Nuevo Producto
                    </button>
                </div>
            </div>

            {/* Tabla de Datos */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">SKU</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Producto</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Categoría</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Precio (S/)</th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Stock</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="py-12 text-center text-sm text-gray-500">
                                No se encontraron productos que coincidan con la búsqueda.
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-600 sm:pl-6">{product.sku}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{product.name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">{product.price.toFixed(2)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-center font-medium">{product.stock}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {getStockBadge(product.stock, product.minStock)}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    {/* 3. Ahora onEditProductClick funcionará perfectamente */}
                                    <button onClick={() => onEditProductClick(product)} className="text-indigo-600 hover:text-indigo-900 font-medium">Editar</button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};