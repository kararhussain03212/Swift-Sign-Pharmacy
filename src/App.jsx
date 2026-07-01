import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import TopBar from './components/layout/TopBar'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import SecondaryNav from './components/layout/SecondaryNav'
import Footer from './components/layout/Footer'
import MobileBottomNav from './components/layout/MobileBottomNav'
import FloatingChat from './components/ui/FloatingChat'
import FeedbackWidget from './components/ui/FeedbackWidget'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Blog       from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact     from './pages/Contact'
import Diseases    from './pages/Diseases'
import DiseaseDetail from './pages/DiseaseDetail'
import AsaanOrder  from './pages/AsaanOrder'
import StoreLocator from './pages/StoreLocator'
import StoreBranchDetail from './pages/StoreBranchDetail'
import Checkout     from './pages/Checkout'
import Certification from './pages/Certification'

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <TopBar />
          <Header />
          <Navbar />
          <SecondaryNav />

        <div className="flex-1">
          <Routes>
            <Route path="/"                  element={<Home />}          />
            <Route path="/shop"                          element={<Shop />} />
            <Route path="/shop/:category"                element={<Shop />} />
            <Route path="/shop/:category/:subCategory"   element={<Shop />} />
            <Route path="/product/:slug"     element={<ProductDetail />} />
            <Route path="/cart"              element={<Cart />}          />
            <Route path="/wishlist"          element={<Wishlist />}      />
            <Route path="/blog"              element={<Blog />}          />
            <Route path="/blog/:slug"        element={<BlogDetail />}    />
            <Route path="/contact"           element={<Contact />}       />
            <Route path="/diseases"          element={<Diseases />}      />
            <Route path="/disease/:slug"     element={<DiseaseDetail />} />
            <Route path="/asaan-order"       element={<AsaanOrder />}    />
            <Route path="/store-locator"     element={<StoreLocator />}  />
            <Route path="/store-locator/:slug" element={<StoreBranchDetail />}  />
            <Route path="/checkout"          element={<Checkout />}      />
            <Route path="/certification"     element={<Certification />} />
            <Route path="*"                  element={<Home />}          />
          </Routes>
        </div>

        <Footer />
        <MobileBottomNav />
        <FloatingChat />
        <FeedbackWidget />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: '#fff',
              color: '#1B1B2F',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            },
          }}
        />
      </div>
    </BrowserRouter>
    </GoogleReCaptchaProvider>
  )
}

export default App
