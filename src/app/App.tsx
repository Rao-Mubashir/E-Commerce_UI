import { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './store';
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
import { LoginPage } from './pages/admin/LoginPage';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { RefundPolicy } from './pages/RefundPolicy';
import { CookiePolicy } from './pages/CookiePolicy';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ArrowLeft } from 'lucide-react';

type Page =
  | 'home'
  | 'cart'
  | 'payment'
  | 'confirmation'
  | 'product-details'
  | 'offer-details'
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

function AppContent() {
  const getInitialPage = (): Page => {
    const path = window.location.pathname.substring(1); // remove leading slash
    if (path === 'admin') return 'admin';
    return 'home';
  };

  const { isAdmin } = useStore();
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage());
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      if (path === 'admin') setCurrentPage('admin');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      setOrderId(id);
    }
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const isAdminPage = currentPage.startsWith('admin');
  // Show header if it's not an admin page, OR if we are on the admin login page (admin page but not logged in), OR if it's the main dashboard
  const showHeader = !isAdminPage || (!isAdmin && isAdminPage) || (currentPage === 'admin' && isAdmin);
  const showFooter = !isAdminPage;

  // Protected Route Logic
  const renderAdminPage = () => {
    if (!isAdmin) {
      return <LoginPage onLoginSuccess={() => navigate('admin')} />;
    }

    switch (currentPage) {
      case 'admin':
        return <AdminDashboard onNavigate={navigate} />;
      case 'admin-offers':
        return <ManageOffers />;
      case 'admin-menu':
        return <ManageMenuItems />;
      case 'admin-orders':
        return <OrderTracking />;
      default:
        return <AdminDashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header onNavigate={navigate} currentPage={currentPage} />}

      {/* Admin Back Button */}
      {isAdminPage && isAdmin && currentPage !== 'admin' && (
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
        {isAdminPage ? (
          renderAdminPage()
        ) : (
          <>
            {currentPage === 'home' && <HomePage onNavigate={navigate} />}
            {currentPage === 'cart' && <CartPage onNavigate={navigate} />}
            {currentPage === 'payment' && <PaymentPage onNavigate={navigate} />}
            {currentPage === 'confirmation' && <OrderConfirmationPage orderId={orderId} onNavigate={navigate} />}
            {currentPage === 'product-details' && <ProductDetailsPage id={orderId} type="menu" onNavigate={navigate} />}
            {currentPage === 'offer-details' && <ProductDetailsPage id={orderId} type="offer" onNavigate={navigate} />}
            {currentPage === 'about' && <AboutUs />}
            {currentPage === 'contact' && <ContactUs />}
            {currentPage === 'privacy' && <PrivacyPolicy />}
            {currentPage === 'terms' && <TermsOfService />}
            {currentPage === 'refund' && <RefundPolicy />}
            {currentPage === 'cookies' && <CookiePolicy />}
          </>
        )}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
