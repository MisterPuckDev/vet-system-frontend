import React, { useState, useMemo } from 'react';
import type { CatalogItem } from '../types';

interface POSCatalogProps {
    catalog: CatalogItem[];
    onAddItem: (item: CatalogItem) => void;
    isLoading: boolean;
}

export const POSCatalog: React.FC<POSCatalogProps> = ({ catalog, onAddItem, isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCatalog = useMemo(() => {
        return catalog.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [catalog, searchTerm]);

    if (isLoading) {
        return (
            <div className="animate-pulse flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Buscar producto o servicio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredCatalog.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onAddItem(item)}
                            disabled={item.type === 'Product' && item.stock === 0}
                            className="flex flex-col text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                        >
                            <div className="flex justify-between items-start w-full">
                                <span className="text-xs font-medium text-gray-500">{item.sku}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    item.type === 'Service' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                                }`}>
                  {item.type === 'Service' ? 'Servicio' : 'Producto'}
                </span>
                            </div>
                            <h4 className="mt-2 text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h4>
                            <div className="mt-auto pt-3 flex justify-between items-center w-full">
                                <span className="text-lg font-bold text-gray-900">S/ {item.price.toFixed(2)}</span>
                                {item.type === 'Product' && (
                                    <span className={`text-xs font-medium ${item.stock === 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    Stock: {item.stock}
                  </span>
                                )}
                            </div>
                        </button>
                    ))}
                    {filteredCatalog.length === 0 && (
                        <div className="col-span-full py-8 text-center text-sm text-gray-500">
                            No se encontraron resultados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};