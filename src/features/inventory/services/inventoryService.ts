import type { InventoryData, Product } from '../types';

let mockProducts: Product[] = [
    { id: 'prod_001', sku: 'MED-1001', name: 'NexGard Spectra (15-30kg)', category: 'Medication', price: 45.00, stock: 12, minStock: 5, expirationDate: '2027-05-12' },
    { id: 'prod_002', sku: 'MED-1002', name: 'Amoxicillin 250mg', category: 'Medication', price: 15.50, stock: 4, minStock: 10, expirationDate: '2026-11-30' },
];

export const inventoryService = {
    getInventoryData: async (): Promise<InventoryData> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const outOfStock = mockProducts.filter(p => p.stock === 0).length;
                const lowStock = mockProducts.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
                resolve({ summary: { totalProducts: mockProducts.length, lowStockItems: lowStock, outOfStockItems: outOfStock }, products: [...mockProducts] });
            }, 600);
        });
    },

    addProduct: async (newProduct: Omit<Product, 'id'>): Promise<Product> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (mockProducts.some(p => p.sku.toLowerCase() === newProduct.sku.toLowerCase())) {
                    reject(new Error(`El SKU "${newProduct.sku}" ya existe.`));
                    return;
                }
                const productCreated = { ...newProduct, id: `prod_${Math.random().toString(36).substr(2, 9)}` };
                mockProducts = [productCreated, ...mockProducts];
                resolve(productCreated);
            }, 800);
        });
    },

    updateProduct: async (id: string, updatedData: Omit<Product, 'id'>): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockProducts.findIndex(p => p.id === id);
                if (index === -1) {
                    reject(new Error('Producto no encontrado.'));
                    return;
                }
                mockProducts[index] = { ...updatedData, id };
                resolve();
            }, 800);
        });
    }
};