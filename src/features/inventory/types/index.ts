export type ProductCategory = 'Medication' | 'Food' | 'Accessory' | 'Supplies';

export interface Product {
    id: string;
    sku: string;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    minStock: number; // Umbral para alertas de "Low Stock"
    expirationDate?: string;
}

export interface InventorySummary {
    totalProducts: number;
    lowStockItems: number;
    outOfStockItems: number;
}

export interface InventoryData {
    summary: InventorySummary;
    products: Product[];
}