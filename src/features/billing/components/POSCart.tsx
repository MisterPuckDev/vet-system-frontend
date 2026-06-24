import React, { useState } from 'react';
import type { CartItem, PaymentMethod } from '../types';

interface POSCartProps {
    cart: CartItem[];
    totals: { subtotal: number; tax: number; total: number };
    isProcessing: boolean;
    error: string | null;
    onUpdateQuantity: (id: string, qty: number) => void;
    onRemoveItem: (id: string) => void;
    onClearCart: () => void;
    onCheckout: (method: PaymentMethod) => void;
}

export const POSCart: React.FC<POSCartProps> = ({
                                                    cart,
                                                    totals,
                                                    isProcessing,
                                                    error,
                                                    onUpdateQuantity,
                                                    onRemoveItem,
                                                    onClearCart,
                                                    onCheckout
                                                }) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');

    return (
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200">

            {/* Cabecera del Ticket */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                <h3 className="text-lg font-bold text-gray-900">Ticket de Venta</h3>
                <button
                    onClick={onClearCart}
                    disabled={cart.length === 0 || isProcessing}
                    className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                    Limpiar Todo
                </button>
            </div>

            {/* Lista de Items */}
            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p>Seleccione productos del catálogo para comenzar.</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                                <div className="flex-1 pr-4">
                                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                                    <p className="text-xs text-gray-500">S/ {item.price.toFixed(2)} c/u</p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <p className="text-sm font-bold text-gray-900">S/ {item.subtotal.toFixed(2)}</p>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={isProcessing}
                                                className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded-l-md"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                disabled={isProcessing || (item.type === 'Product' && item.quantity >= (item.stock || 0))}
                                                className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => onRemoveItem(item.id)}
                                            disabled={isProcessing}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Resumen y Pagos (Fijado abajo) */}
            <div className="bg-gray-50 p-4 rounded-b-xl border-t border-gray-200">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal:</span>
                        <span>S/ {totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>IGV (18%):</span>
                        <span>S/ {totals.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                        <span>Total:</span>
                        <span>S/ {totals.total.toFixed(2)}</span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        disabled={cart.length === 0 || isProcessing}
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
                    >
                        <option value="Cash">Efectivo</option>
                        <option value="Debit Card">Tarjeta de Débito</option>
                        <option value="Credit Card">Tarjeta de Crédito</option>
                        <option value="Transfer">Transferencia / Yape / Plin</option>
                    </select>
                </div>

                <button
                    onClick={() => onCheckout(paymentMethod)}
                    disabled={cart.length === 0 || isProcessing}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        cart.length === 0 ? 'bg-gray-300 cursor-not-allowed' :
                            isProcessing ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                    {isProcessing ? (
                        <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
                    ) : (
                        `Cobrar S/ ${totals.total.toFixed(2)}`
                    )}
                </button>
            </div>
        </div>
    );
};