import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useCartStore } from './store/cartStore';
import { authAPI } from './services/api';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      if (token && !user) {
        try {
          const response = await authAPI.getProfile();
          updateUser(response.data.user);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };
    initializeApp();
  }, [user, updateUser]);

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated, fetchCart]);

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: 'var(--obsidian)' }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Products />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1A1A',
              color: '#F0EAD6',
              border: '1px solid #2A2A2A',
              fontFamily: 'Raleway, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.05em',
              borderRadius: '0',
            },
            success: {
              duration: 3000,
              iconTheme: { primary: '#C9A84C', secondary: '#1A1A1A' },
            },
            error: {
              duration: 5000,
              iconTheme: { primary: '#C9704C', secondary: '#1A1A1A' },
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;
