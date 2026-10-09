/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TAMIL_NADU_BRANCHES } from './data/branches';
import { Product, CakeSizeOption, CartItem, Branch, OrderRecord, CategoryId } from './types/bakery';
import { PageId } from './types/navigation';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CustomBuilderPage } from './pages/CustomBuilderPage';
import { BranchesPage } from './pages/BranchesPage';
import { GalleryPage } from './pages/GalleryPage';
import { TrackerPage } from './pages/TrackerPage';
import { StandardsPage } from './pages/StandardsPage';
import { BranchModal } from './components/BranchModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export default function App() {
  // Page Routing State with URL Hash Synchronization
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['menu', 'custom-builder', 'branches', 'gallery', 'tracker', 'standards'].includes(hash)) {
      return hash as PageId;
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState<PageId>(getInitialPage);

  // Selected Branch (defaults to Anna Nagar Flagship)
  const [selectedBranch, setSelectedBranch] = useState<Branch>(TAMIL_NADU_BRANCHES[0]);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lava_cakes_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Add-ons
  const [addOnSparkleCandles, setAddOnSparkleCandles] = useState(false);
  const [addOnLuxuryBox, setAddOnLuxuryBox] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Order Placement & Tracker State
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(null);
  const [orderConfirmationNotice, setOrderConfirmationNotice] = useState<string | null>(null);

  // Cross-page parameters
  const [menuInitialCategory, setMenuInitialCategory] = useState<CategoryId | undefined>();
  const [presetCustomFlavor, setPresetCustomFlavor] = useState<string | undefined>();

  // Sync route with browser hash for back/forward support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'menu', 'custom-builder', 'branches', 'gallery', 'tracker', 'standards'].includes(hash)) {
        setActivePage((hash || 'home') as PageId);
      } else if (!hash) {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lava_cakes_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Could not save cart:', e);
    }
  }, [cartItems]);

  const handleNavigatePage = (
    pageId: PageId,
    extra?: { categoryId?: CategoryId; flavor?: string }
  ) => {
    if (extra?.categoryId) {
      setMenuInitialCategory(extra.categoryId);
    }
    if (extra?.flavor) {
      setPresetCustomFlavor(extra.flavor);
    }

    setActivePage(pageId);
    window.location.hash = pageId === 'home' ? '#/' : `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAddToCart = (
    product: Product,
    selectedSize: CakeSizeOption,
    isEggless: boolean,
    customMessage?: string
  ) => {
    const newItem: CartItem = {
      id: `${product.id}-${selectedSize.label}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      category: product.categoryId,
      selectedSize,
      isEggless,
      customMessage,
      quantity: 1,
      unitPrice: selectedSize.price,
      addOns: {},
    };

    setCartItems(prev => [...prev, newItem]);
  };

  const handleAddCustomCakeToCart = (customItem: CartItem) => {
    setCartItems(prev => [...prev, customItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleOrderConfirmed = (order: OrderRecord) => {
    setLatestOrder(order);
    setCartItems([]);
    setOrderConfirmationNotice(
      `Order ${order.orderId} confirmed! Our master bakers at ${order.branch.name} are preparing your cake.`
    );

    // Switch to dedicated Track Order Page
    handleNavigatePage('tracker');

    setTimeout(() => {
      setOrderConfirmationNotice(null);
    }, 7000);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241A15] flex flex-col font-sans">
      {/* Toast Notice */}
      {orderConfirmationNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] bg-emerald-900 text-white p-3.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 border border-emerald-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{orderConfirmationNotice}</span>
          </div>
          <button
            onClick={() => setOrderConfirmationNotice(null)}
            className="text-stone-300 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Bar Navigation Header */}
      <Header
        selectedBranch={selectedBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        cartCount={totalCartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Page Routing Views (Distinct Pages, No Endless Single-Scroll) */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            selectedBranch={selectedBranch}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {activePage === 'menu' && (
          <MenuPage
            selectedBranch={selectedBranch}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
            initialCategory={menuInitialCategory}
            onAddToCart={handleAddToCart}
            onOpenCustomBuilder={flavor => {
              handleNavigatePage('custom-builder', { flavor });
            }}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {activePage === 'custom-builder' && (
          <CustomBuilderPage
            selectedBranch={selectedBranch}
            presetFlavor={presetCustomFlavor}
            onAddToCart={handleAddCustomCakeToCart}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {activePage === 'branches' && (
          <BranchesPage
            selectedBranch={selectedBranch}
            onSelectBranch={branch => setSelectedBranch(branch)}
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateMenu={() => handleNavigatePage('menu')}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            onNavigateCustomBuilder={() => handleNavigatePage('custom-builder')}
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateMenu={() => handleNavigatePage('menu')}
          />
        )}

        {activePage === 'tracker' && (
          <TrackerPage
            currentOrder={latestOrder}
            activeBranch={selectedBranch}
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateMenu={() => handleNavigatePage('menu')}
          />
        )}

        {activePage === 'standards' && (
          <StandardsPage
            selectedBranch={selectedBranch}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateMenu={() => handleNavigatePage('menu')}
          />
        )}
      </main>

      {/* Mobile Sticky Ordering Bar (Under 15% Mobile Sticky Ceiling) */}
      {totalCartCount > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-[#24140D] text-white border-t border-stone-800 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <span className="font-bold">{totalCartCount} in Bag</span>
              <span className="block font-mono text-stone-300">₹{cartSubtotal}</span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-[#9A3412] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>View Bag</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        selectedBranch={selectedBranch}
        onSelectBranch={branch => setSelectedBranch(branch)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedBranch={selectedBranch}
        onOpenBranchModal={() => {
          setIsCartOpen(false);
          setIsBranchModalOpen(true);
        }}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        addOnSparkleCandles={addOnSparkleCandles}
        onToggleSparkleCandles={() => setAddOnSparkleCandles(!addOnSparkleCandles)}
        addOnLuxuryBox={addOnLuxuryBox}
        onToggleLuxuryBox={() => setAddOnLuxuryBox(!addOnLuxuryBox)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        selectedBranch={selectedBranch}
        addOnSparkleCandles={addOnSparkleCandles}
        addOnLuxuryBox={addOnLuxuryBox}
        onOrderConfirmed={handleOrderConfirmed}
      />

      {/* Site Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
      />
    </div>
  );
}
