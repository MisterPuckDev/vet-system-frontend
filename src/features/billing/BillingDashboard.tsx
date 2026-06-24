import React from 'react';
import { usePOS } from './hooks/usePOS';
import { POSCatalog } from './components/POSCatalog';
import { POSCart } from './components/POSCart';

const BillingDashboard: React.FC = () => {
    const {
        catalog,
        cart,
        totals,
        isLoadingCatalog,
        isProcessing,
        error,
        lastReceipt,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        processCheckout,
    } = usePOS();

    if (lastReceipt) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh]">
                {/* El modificador print: de Tailwind aísla este contenedor al imprimir */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full text-center print:fixed print:inset-0 print:z-[9999] print:shadow-none print:border-none print:w-full print:max-w-none print:p-12">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 print:hidden">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Comprobante de Pago</h2>
                    <p className="text-gray-500 mb-6">Transacción <span className="font-mono text-indigo-600">{lastReceipt.transactionId}</span></p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left text-sm border border-gray-200">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-500">Fecha:</span>
                            <span className="font-medium text-gray-900">{new Date(lastReceipt.date).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-500">Método de Pago:</span>
                            <span className="font-medium text-gray-900">{lastReceipt.paymentMethod}</span>
                        </div>
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Detalle:</h4>
                            {lastReceipt.items.map(item => (
                                <div key={item.id} className="flex justify-between mb-1">
                                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                                    <span className="text-gray-900">S/ {item.subtotal.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                            <span className="font-bold text-gray-900">Total Pagado:</span>
                            <span className="font-bold text-indigo-600">S/ {lastReceipt.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Botones ocultos durante la impresión */}
                    <div className="flex flex-col space-y-3 print:hidden">
                        <button
                            onClick={() => window.print()}
                            className="w-full py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
                        >
                            Imprimir Comprobante
                        </button>
                        <button
                            onClick={clearCart}
                            className="w-full py-2.5 px-4 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Nueva Venta
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-4 flex-shrink-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Punto de Venta (POS)</h2>
            </div>
            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                <div className="flex-1 lg:w-3/5 h-full min-h-[400px]">
                    <POSCatalog catalog={catalog} onAddItem={addToCart} isLoading={isLoadingCatalog} />
                </div>
                <div className="w-full lg:w-2/5 h-full min-h-[500px] flex-shrink-0">
                    <POSCart
                        cart={cart} totals={totals} isProcessing={isProcessing} error={error}
                        onUpdateQuantity={updateQuantity} onRemoveItem={removeFromCart}
                        onClearCart={clearCart} onCheckout={processCheckout}
                    />
                </div>
            </div>
        </div>
    );
};

export default BillingDashboard;