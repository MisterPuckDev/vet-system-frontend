import React, { useState } from 'react';
import { useInventory } from './hooks/useInventory';
import { InventoryGrid } from './components/InventoryGrid';
import { ProductModal } from './components/ProductModal';
import type { Product } from './types';

const InventoryDashboard: React.FC = () => {
    const { data, filteredProducts, isLoading, error, searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, addProduct, updateProduct, refetch } = useInventory();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const handleAddClick = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleSaveModal = async (productData: Omit<Product, 'id'>, id?: string) => {
        if (id) {
            await updateProduct(id, productData);
        } else {
            await addProduct(productData);
        }
    };

    if (isLoading && !data) return <div className="animate-pulse space-y-6"><div className="h-96 bg-gray-200 rounded-xl mt-8"></div></div>;

    if (error) {
        return (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                Hubo un problema al cargar el inventario: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Control de Inventario</h2>
            </div>
            <InventoryGrid
                products={filteredProducts} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
                onAddProductClick={handleAddClick} onEditProductClick={handleEditClick}
            />
            <ProductModal
                isOpen={isModalOpen} initialData={productToEdit}
                onClose={() => setIsModalOpen(false)} onSave={handleSaveModal}
            />
        </div>
    );
};
export default InventoryDashboard;