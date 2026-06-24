import { useState, useEffect, useCallback, useMemo } from 'react';
import type { InventoryData, Product } from '../types';
import { inventoryService } from '../services/inventoryService';

export const useInventory = () => {
    const [data, setData] = useState<InventoryData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('All');

    const fetchInventory = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await inventoryService.getInventoryData();
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Error al acceder al inventario.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addProduct = async (productData: Omit<Product, 'id'>) => {
        await inventoryService.addProduct(productData);
        await fetchInventory();
    };

    const updateProduct = async (id: string, productData: Omit<Product, 'id'>) => {
        await inventoryService.updateProduct(id, productData);
        await fetchInventory();
    };

    useEffect(() => { fetchInventory(); }, [fetchInventory]);

    const filteredProducts = useMemo<Product[]>(() => {
        if (!data) return [];
        return data.products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.sku.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [data, searchTerm, categoryFilter]);

    return { data, filteredProducts, isLoading, error, searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, addProduct, updateProduct, refetch: fetchInventory };
};