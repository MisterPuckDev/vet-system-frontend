export type ItemType = 'Product' | 'Service';
export type PaymentMethod = 'Cash' | 'Credit Card' | 'Debit Card' | 'Transfer';

export interface CatalogItem {
    id: string;
    sku: string;
    name: string;
    price: number;
    type: ItemType;
    stock?: number; // Opcional porque los servicios no tienen stock
}

export interface CartItem extends CatalogItem {
    quantity: number;
    subtotal: number;
}

export interface InvoiceReceipt {
    transactionId: string;
    date: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: PaymentMethod;
}