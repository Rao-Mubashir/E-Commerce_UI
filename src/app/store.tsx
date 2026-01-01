import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, Offer, CartItem, Order, CustomerInfo } from './types';

interface StoreContextType {
  // Menu Items
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;

  // Offers
  offers: Offer[];
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, offer: Offer) => void;
  deleteOffer: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  addOfferToCart: (offer: Offer) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Orders
  orders: Order[];
  createOrder: (customerInfo: CustomerInfo) => Order;

  // Customer Info
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;

  // Admin Auth
  isAdmin: boolean;
  adminLogin: (username: string) => void;
  adminLogout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial mock data
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with seasonal vegetables',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    category: 'Main Course'
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce with parmesan and croutons',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    category: 'Salad'
  },
  {
    id: '4',
    name: 'Beef Burger',
    description: 'Angus beef patty with cheese, lettuce, and special sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'Burgers'
  },
  {
    id: '5',
    name: 'Pasta Carbonara',
    description: 'Creamy Italian pasta with bacon and parmesan',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    category: 'Pasta'
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    category: 'Dessert'
  }
];

const initialOffers: Offer[] = [
  {
    id: '1',
    title: '50% OFF Pizza Week',
    description: 'Get 50% off on all pizza orders this week only!',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop',
    discount: 50,
    originalPrice: 25.99,
    active: true
  },
  {
    id: '2',
    title: 'Family Feast Special',
    description: 'Complete family meal with appetizers, mains, and desserts',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop',
    discount: 30,
    originalPrice: 59.99,
    active: true
  },
  {
    id: '3',
    title: 'Happy Hour Special',
    description: 'Buy 1 Get 1 Free on selected items from 4-6 PM',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
    discount: 50,
    originalPrice: 19.99,
    active: true
  }
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuRes = await fetch('/api/menu-items');
        const menuData = await menuRes.json();
        if (menuData.data) setMenuItems(menuData.data);

        const offersRes = await fetch('/api/offers');
        const offersData = await offersRes.json();
        if (offersData.data) setOffers(offersData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Persist cart and orders to localStorage (keep client-side for now)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Menu Items
  // Menu Items
  const addMenuItem = async (item: MenuItem) => {
    try {
      const res = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        setMenuItems(prev => [...prev, item]);
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const updateMenuItem = async (id: string, item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu-items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        setMenuItems(prev => prev.map(i => i.id === id ? item : i));
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const res = await fetch(`/api/menu-items/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMenuItems(prev => prev.filter(i => i.id !== id));
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  // Offers
  // Offers
  const addOffer = async (offer: Offer) => {
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      });
      if (res.ok) {
        setOffers(prev => [...prev, offer]);
      }
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };

  const updateOffer = async (id: string, offer: Offer) => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      });
      if (res.ok) {
        setOffers(prev => prev.map(o => o.id === id ? offer : o));
      }
    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };

  const deleteOffer = async (id: string) => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setOffers(prev => prev.filter(o => o.id !== id));
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  // Cart
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.menuItem?.id === item.id);
      if (existing) {
        return prev.map(ci =>
          ci.menuItem?.id === item.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const addOfferToCart = (offer: Offer) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.offer?.id === offer.id);
      if (existing) {
        return prev.map(ci =>
          ci.offer?.id === offer.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { offer, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(ci =>
      (ci.menuItem?.id !== itemId) && (ci.offer?.id !== itemId)
    ));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(ci =>
        (ci.menuItem?.id === itemId || ci.offer?.id === itemId)
          ? { ...ci, quantity }
          : ci
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => {
      if (item.menuItem) {
        return sum + (item.menuItem.price || 0) * item.quantity;
      } else if (item.offer) {
        // Calculate discounted price: originalPrice * (1 - discount/100)
        const originalPrice = item.offer.originalPrice || 0;
        const discount = item.offer.discount || 0;
        const discountedPrice = originalPrice * (1 - discount / 100);
        return sum + discountedPrice * item.quantity;
      }
      return sum;
    },
    0
  );

  // Orders
  const createOrder = (customerInfo: CustomerInfo): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      customerName: customerInfo.fullName,
      email: customerInfo.email,
      phone: customerInfo.phone,
      items: [...cart],
      totalAmount: cartTotal,
      paymentStatus: 'Paid',
      orderStatus: 'New',
      createdAt: new Date()
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  };

  // Admin Auth
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const adminLogin = (username: string) => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <StoreContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        cart,
        addToCart,
        addOfferToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        orders,
        createOrder,
        customerInfo,
        setCustomerInfo,
        isAdmin,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}