import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import TopBar from './components/layout/TopBar'
import Header from './components/layout/Header'
// import Navbar from './components/layout/Navbar'
import SecondaryNav from './components/layout/SecondaryNav'
import Footer from './components/layout/Footer'
import MobileBottomNav from './components/layout/MobileBottomNav'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Blog       from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact    from './pages/Contact'
import Diseases     from './pages/Diseases'
import AsaanOrder   from './pages/AsaanOrder'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        {/* <Navbar /> */}
        <SecondaryNav />

        <div className="flex-1">
          <Routes>
            <Route path="/"                  element={<Home />}          />
            <Route path="/shop"              element={<Shop />}          />
            <Route path="/product/:slug"     element={<ProductDetail />} />
            <Route path="/cart"              element={<Cart />}          />
            <Route path="/wishlist"          element={<Wishlist />}      />
            <Route path="/blog"              element={<Blog />}          />
            <Route path="/blog/:slug"        element={<BlogDetail />}    />
            <Route path="/contact"           element={<Contact />}       />
            <Route path="/diseases"          element={<Diseases />}      />
            <Route path="/asaan-order"       element={<AsaanOrder />}    />
            <Route path="*"                  element={<Home />}          />
          </Routes>
        </div>

        <Footer />
        <MobileBottomNav />

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
  )
}

export default App
