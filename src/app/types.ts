export interface MenuItem {
  id: string;
  name: string;
  description: string;
  detailPageDescription?: string;
  price: number;
  image: string;
  category?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  detailPageDescription?: string;
  image: string;
  discount: number;
  originalPrice: number;
  active: boolean;
}

export interface CartItem {
  menuItem?: MenuItem;
  offer?: Offer;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: CartItem[];
  totalAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  orderStatus: 'New' | 'Processing' | 'Completed';
  createdAt: Date;
}

export interface PaymentInfo {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}