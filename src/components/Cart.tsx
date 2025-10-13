import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isDark, isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, checkoutUrl, isLoading } = useCart();

  if (!isOpen) return null;

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[480px] z-50 transition-colors duration-500 ${
          isDark ? 'bg-black text-white' : 'bg-white text-black'
        } shadow-2xl transform transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-6 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">YOUR BAG</h2>
              <button
                onClick={onClose}
                className={`p-2 hover:opacity-60 transition-opacity ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {cart.length > 0 && (
              <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className={`w-16 h-16 mb-4 ${isDark ? 'text-white/20' : 'text-black/20'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className={`text-lg mb-2 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                  Your bag is empty
                </p>
                <button
                  onClick={onClose}
                  className={`mt-4 px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 ${
                    isDark
                      ? 'bg-white text-black hover:bg-yellow-400'
                      : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
                  }`}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => {
                  const image = item.variant.image || item.product.images[0];
                  
                  return (
                    <div
                      key={item.variantId}
                      className={`flex gap-4 pb-6 border-b ${
                        isDark ? 'border-white/10' : 'border-black/10'
                      }`}
                    >
                      {/* Product Image */}
                      <div className={`w-24 h-24 flex-shrink-0 ${
                        isDark ? 'bg-white/5' : 'bg-black/5'
                      }`}>
                        {image ? (
                          <img
                            src={image.src}
                            alt={image.altText || item.product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className={`text-2xl font-bold ${
                              isDark ? 'text-white/10' : 'text-black/10'
                            }`}>
                              AF
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 truncate">
                          {item.product.title}
                        </h3>
                        {item.variant.title !== 'Default Title' && (
                          <p className={`text-xs mb-2 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                            {item.variant.title}
                          </p>
                        )}
                        <p className="text-sm font-medium mb-3">
                          {formatPrice(item.variant.priceV2.amount, item.variant.priceV2.currencyCode)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className={`inline-flex items-center border ${
                            isDark ? 'border-white/20' : 'border-black/20'
                          }`}>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              disabled={isLoading}
                              className={`px-3 py-1 text-sm ${
                                isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                              } transition-colors disabled:opacity-50`}
                            >
                              -
                            </button>
                            <div className="px-3 py-1 min-w-[40px] text-center text-sm">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              disabled={isLoading}
                              className={`px-3 py-1 text-sm ${
                                isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                              } transition-colors disabled:opacity-50`}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.variantId)}
                            disabled={isLoading}
                            className={`text-xs underline ${
                              isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                            } transition-colors disabled:opacity-50`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {cart.length > 0 && (
            <div className={`p-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">SUBTOTAL</span>
                <span className="text-2xl font-bold">
                  {formatPrice(cartTotal.toFixed(2), cart[0].variant.priceV2.currencyCode)}
                </span>
              </div>
              <p className={`text-xs mb-4 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                Shipping and taxes calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                disabled={isLoading || !checkoutUrl}
                className={`w-full py-4 text-sm font-bold tracking-wide transition-all duration-200 ${
                  isDark
                    ? 'bg-white text-black hover:bg-yellow-400'
                    : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'LOADING...' : 'CHECKOUT'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

