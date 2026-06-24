import type { CatalogItem, InvoiceReceipt, PaymentMethod, CartItem } from '../types';

// Simulamos una vista combinada de servicios clínicos y productos de inventario
const mockCatalog: CatalogItem[] = [
    { id: 'srv_001', sku: 'CON-001', name: 'Consulta General', price: 60.00, type: 'Service' },
    { id: 'srv_002', sku: 'CON-002', name: 'Consulta Especialidad', price: 90.00, type: 'Service' },
    { id: 'srv_003', sku: 'VAC-001', name: 'Vacuna Múltiple Canina', price: 45.00, type: 'Service' },
    { id: 'prod_001', sku: 'MED-1001', name: 'NexGard Spectra (15-30kg)', price: 45.00, type: 'Product', stock: 12 },
    { id: 'prod_003', sku: 'FOD-2001', name: 'Royal Canin Renal Dry Cat 2kg', price: 32.00, type: 'Product', stock: 8 },
    { id: 'prod_005', sku: 'ACC-3001', name: 'Collar Isabelino (Talla L)', price: 12.00, type: 'Product', stock: 25 },
];

export const billingService = {
    getCatalog: async (): Promise<CatalogItem[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockCatalog]);
            }, 600);
        });
    },

    processPayment: async (
        items: CartItem[],
        method: PaymentMethod,
        totalCalculated: number
    ): Promise<InvoiceReceipt> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (items.length === 0) {
                    reject(new Error('El carrito está vacío.'));
                    return;
                }

                // Simulación de falla aleatoria de red bancaria (1 de cada 10 veces fallará para probar el UI)
                if (Math.random() < 0.1 && method !== 'Cash') {
                    reject(new Error('Fondos insuficientes o error en la pasarela bancaria.'));
                    return;
                }

                const receipt: InvoiceReceipt = {
                    transactionId: `TXN-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
                    date: new Date().toISOString(),
                    items: [...items],
                    subtotal: totalCalculated / 1.18, // Simulamos cálculo inverso asumiendo IGV 18%
                    tax: totalCalculated - (totalCalculated / 1.18),
                    total: totalCalculated,
                    paymentMethod: method,
                };

                resolve(receipt);
            }, 1500); // Simulamos latencia de comunicación con el POS bancario
        });
    }
};