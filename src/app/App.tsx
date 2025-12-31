import { useState } from 'react';
import { StoreProvider } from './store';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageOffers } from './pages/admin/ManageOffers';
import { ManageMenuItems } from './pages/admin/ManageMenuItems';
import { OrderTracking } from './pages/admin/OrderTracking';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { RefundPolicy } from './pages/RefundPolicy';
import { CookiePolicy } from './pages/CookiePolicy';
import { ArrowLeft } from 'lucide-react';

type Page = 
  | 'home' 
  | 'cart' 
  | 'payment' 
  | 'confirmation'
  | 'admin'
  | 'admin-offers'
  | 'admin-menu'
  | 'admin-orders'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'refund'
  | 'cookies';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [orderId, setOrderId] = useState<string>('');

  const navigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      setOrderId(id);
    }
    window.scrollTo(0, 0);
  };

  const isAdminPage = currentPage.startsWith('admin');
  const showHeader = !isAdminPage || currentPage === 'admin';
  const showFooter = !isAdminPage;

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">{/* E-commerce platform */}
        {showHeader && <Header onNavigate={navigate} currentPage={currentPage} />}

        {/* Admin Back Button */}
        {isAdminPage && currentPage !== 'admin' && (
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={() => navigate('admin')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        )}

        <main className="flex-1">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'cart' && <CartPage onNavigate={navigate} />}
          {currentPage === 'payment' && <PaymentPage onNavigate={navigate} />}
          {currentPage === 'confirmation' && <OrderConfirmationPage orderId={orderId} onNavigate={navigate} />}
          {currentPage === 'admin' && <AdminDashboard onNavigate={navigate} />}
          {currentPage === 'admin-offers' && <ManageOffers />}
          {currentPage === 'admin-menu' && <ManageMenuItems />}
          {currentPage === 'admin-orders' && <OrderTracking />}
          {currentPage === 'about' && <AboutUs />}
          {currentPage === 'contact' && <ContactUs />}
          {currentPage === 'privacy' && <PrivacyPolicy />}
          {currentPage === 'terms' && <TermsOfService />}
          {currentPage === 'refund' && <RefundPolicy />}
          {currentPage === 'cookies' && <CookiePolicy />}
        </main>

        {showFooter && <Footer onNavigate={navigate} />}

        {/* Removed Toaster - not needed for this implementation */}
      </div>
    </StoreProvider>
  );
}