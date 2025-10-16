import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { shopifyService } from '../services/shopify';
import type { CartItem, ShopifyProduct, ShopifyVariant } from '../types/shopify';

interface CartContextType {
  cart: CartItem[];
  checkoutUrl: string | null;
  isLoading: boolean;
  addToCart: (product: ShopifyProduct, variant: ShopifyVariant, quantity: number) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCheckoutId = localStorage.getItem('checkoutId');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    if (savedCheckoutId) {
      setCheckoutId(savedCheckoutId);
      loadCheckout(savedCheckoutId);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const loadCheckout = async (id: string) => {
    try {
      const checkout = await shopifyService.fetchCheckout(id);
      if (checkout) {
        setCheckoutUrl(checkout.webUrl);
      }
    } catch (error) {
      console.error('Error loading checkout:', error);
    }
  };

  const createOrGetCheckout = async () => {
    if (checkoutId) {
      return checkoutId;
    }

    const checkout = await shopifyService.createCheckout();
    if (checkout) {
      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);
      localStorage.setItem('checkoutId', checkout.id);
      return checkout.id;
    }
    return null;
  };

  const addToCart = async (product: ShopifyProduct, variant: ShopifyVariant, quantity: number) => {
    setIsLoading(true);
    try {
      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex(item => item.variantId === variant.id);
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const newCart = [...cart];
        newCart[existingItemIndex].quantity += quantity;
        setCart(newCart);
      } else {
        // Add new item
        const newItem: CartItem = {
          variantId: variant.id,
          quantity,
          product,
          variant,
        };
        setCart([...cart, newItem]);
      }

      // Update Shopify checkout
      const currentCheckoutId = await createOrGetCheckout();
      if (currentCheckoutId) {
        const lineItems = [{ variantId: variant.id, quantity }];
        const updatedCheckout = await shopifyService.addItemToCheckout(currentCheckoutId, lineItems);
        if (updatedCheckout) {
          setCheckoutUrl(updatedCheckout.webUrl);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (variantId: string) => {
    setIsLoading(true);
    try {
      setCart(cart.filter(item => item.variantId !== variantId));
      
      // Update Shopify checkout
      if (checkoutId) {
        const checkout = await shopifyService.fetchCheckout(checkoutId);
        if (checkout) {
          const lineItem = checkout.lineItems.find((item: any) => item.variant.id === variantId);
          if (lineItem) {
            await shopifyService.removeLineItem(checkoutId, [lineItem.id]);
          }
        }
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        await removeFromCart(variantId);
        return;
      }

      const newCart = cart.map(item =>
        item.variantId === variantId ? { ...item, quantity } : item
      );
      setCart(newCart);

      // Update Shopify checkout
      if (checkoutId) {
        const checkout = await shopifyService.fetchCheckout(checkoutId);
        if (checkout) {
          const lineItem = checkout.lineItems.find((item: any) => item.variant.id === variantId);
          if (lineItem) {
            await shopifyService.updateLineItem(checkoutId, [{ id: lineItem.id, quantity }]);
          }
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutId(null);
    setCheckoutUrl(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutId');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.variant.priceV2.amount);
    return total + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        checkoutUrl,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}


