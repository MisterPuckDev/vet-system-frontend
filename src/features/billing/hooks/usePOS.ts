import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CatalogItem, CartItem, PaymentMethod, InvoiceReceipt } from '../types';
import { billingService } from '../services/billingService';

export const usePOS = () => {
    const [catalog, setCatalog] = useState<CatalogItem[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState<boolean>(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastReceipt, setLastReceipt] = useState<InvoiceReceipt | null>(null);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const data = await billingService.getCatalog();
                setCatalog(data);
            } catch (err) {
                setError('Error al cargar el catálogo de facturación.');
            } finally {
                setIsLoadingCatalog(false);
            }
        };
        fetchCatalog();
    }, []);

    const addToCart = useCallback((item: CatalogItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                // Verificar stock si es un producto
                if (item.type === 'Product' && item.stock && existingItem.quantity >= item.stock) {
                    return prevCart; // No agrega más si excede stock
                }
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1, subtotal: (cartItem.quantity + 1) * cartItem.price }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1, subtotal: item.price }];
        });
    }, []);

    const removeFromCart = useCallback((itemId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    }, []);

    const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === itemId) {
                    // Bloqueo de stock
                    if (item.type === 'Product' && item.stock && newQuantity > item.stock) {
                        return item;
                    }
                    return { ...item, quantity: newQuantity, subtotal: newQuantity * item.price };
                }
                return item;
            })
        );
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setCart([]);
        setError(null);
        setLastReceipt(null);
    }, []);

    // Cálculos financieros en memoria, protegidos por useMemo
    const totals = useMemo(() => {
        const subtotalBruto = cart.reduce((sum, item) => sum + item.subtotal, 0);
        // Asumimos un IGV del 18% incluido en el precio para simplificar (Perú) o calculado a parte.
        // Para este ejercicio: el precio del catálogo NO incluye impuesto, se añade al final.
        const taxRate = 0.18;
        const taxAmount = subtotalBruto * taxRate;
        const totalAmount = subtotalBruto + taxAmount;

        return {
            subtotal: subtotalBruto,
            tax: taxAmount,
            total: totalAmount,
        };
    }, [cart]);

    const processCheckout = async (method: PaymentMethod) => {
        setIsProcessing(true);
        setError(null);
        try {
            const receipt = await billingService.processPayment(cart, method, totals.total);
            setLastReceipt(receipt);
            setCart([]); // Vaciamos el carrito tras pago exitoso
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado durante el cobro.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return {
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
    };
};