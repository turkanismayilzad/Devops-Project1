import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { itemCount } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        className="hidden md:flex items-center justify-center py-2">
        <p style={{ color: 'var(--gold)', fontSize: '0.6rem', letterSpacing: '0.25em' }} className="uppercase">
          Complimentary shipping on orders over $500 · Swiss movement guaranteed
        </p>
      </div>

      <header style={{
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'var(--obsidian)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.4s ease',
      }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
                className="uppercase hover:text-white gold-line transition-colors duration-300">Collections</Link>
              <Link to="/categories" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
                className="uppercase hover:text-white gold-line transition-colors duration-300">Maisons</Link>
            </nav>

            <Link to="/" className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, letterSpacing: '0.35em', color: 'var(--text-primary)', lineHeight: 1 }}>
                CHRONOS
              </span>
              <span style={{ fontSize: '0.45rem', letterSpacing: '0.4em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '2px' }}>
                Haute Horlogerie
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex items-center">
                  <input type="text" placeholder="Search" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: 'transparent', border: 'none',
                      borderBottom: '1px solid var(--border)',
                      color: 'var(--text-primary)', fontSize: '0.7rem', letterSpacing: '0.1em',
                      outline: 'none',
                      width: searchQuery ? '120px' : '0',
                      transition: 'width 0.3s ease',
                      padding: searchQuery ? '0.25rem 2rem 0.25rem 0' : '0',
                      overflow: 'hidden',
                    }} />
                  <button type="submit" style={{ color: 'var(--text-secondary)' }} className="hover:text-white transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <Link to="/cart" className="relative" style={{ color: 'var(--text-secondary)' }}>
                <ShoppingCart className="h-5 w-5 hover:text-white transition-colors" />
                {itemCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-8px',
                    background: 'var(--gold)', color: 'var(--obsidian)',
                    fontSize: '0.55rem', borderRadius: '50%',
                    width: '16px', height: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600,
                  }}>{itemCount}</span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/orders" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
                    className="uppercase hover:text-white gold-line transition-colors duration-300">Orders</Link>
                  <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                    <User className="h-4 w-4" />
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>{user?.firstName}</span>
                  </div>
                  <button onClick={handleLogout} style={{ color: 'var(--text-muted)' }} className="hover:text-white transition-colors">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
                    className="uppercase hover:text-white transition-colors">Sign In</Link>
                  <Link to="/register" style={{
                    border: '1px solid var(--gold)', color: 'var(--gold)',
                    fontSize: '0.65rem', letterSpacing: '0.2em',
                    padding: '0.4rem 1rem', textTransform: 'uppercase', transition: 'all 0.3s',
                  }}>Register</Link>
                </div>
              )}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden ml-auto" style={{ color: 'var(--text-secondary)' }}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)' }} className="md:hidden px-6 py-8">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input type="text" placeholder="Search timepieces..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="input w-full pr-10" />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
            <nav className="space-y-5">
              {[{ to: '/products', label: 'Collections' }, { to: '/categories', label: 'Maisons' }, { to: '/cart', label: `Cart${itemCount > 0 ? ` (${itemCount})` : ''}` }].map(({ to, label }) => (
                <Link key={to} to={to} style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.25em' }}
                  className="block uppercase hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>{label}</Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/orders" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.25em' }}
                    className="block uppercase hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.25em' }}
                    className="block uppercase hover:text-white transition-colors">Sign Out</button>
                </>
              ) : (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }} className="flex space-x-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}
                    style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.2em' }}
                    className="uppercase hover:text-white transition-colors">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}
                    style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.2em', padding: '0.4rem 1rem', textTransform: 'uppercase' }}>Register</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
