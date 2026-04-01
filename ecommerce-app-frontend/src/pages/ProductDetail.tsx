import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Shield, Clock, Award } from 'lucide-react';
import { useQuery } from 'react-query';
import { productsAPI } from '../services/api';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const { data, isLoading } = useQuery(['product', id], () => productsAPI.getProduct(Number(id)));
  const product = data?.data.product;

  const handleAddToCart = async () => {
    if (!product) return;
    if (!isAuthenticated) { navigate('/login'); return; }
    setAdding(true);
    try {
      await addToCart(product.id, quantity);
      toast.success(`${product.name} added to your selection`);
    } catch {
      toast.error('Unable to add item');
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-spinner" style={{ width: '40px', height: '40px' }} />
    </div>
  );

  if (!product) return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Timepiece not found</p>
        <Link to="/products" style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1rem', display: 'inline-block' }}>
          Return to Collection
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        <button onClick={() => navigate(-1)} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', background: 'none', border: 'none',
          cursor: 'pointer', marginBottom: '3rem', transition: 'color 0.3s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          <ArrowLeft className="h-4 w-4" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Image */}
          <div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden', aspectRatio: '1/1' }}>
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"
                style={{ transition: 'transform 0.6s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            </div>
            {product.stock < 10 && product.stock > 0 && (
              <p style={{ color: '#C9704C', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1rem', textAlign: 'center' }}>
                Only {product.stock} pieces remaining
              </p>
            )}
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-label mb-4">{product.category}</span>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300,
              color: 'var(--text-primary)', letterSpacing: '0.03em',
              lineHeight: 1.1, margin: '1rem 0',
            }}>
              {product.name}
            </h1>
            <div style={{ width: '50px', height: '1px', background: 'var(--gold)', marginBottom: '2rem' }} />

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.9, letterSpacing: '0.04em', marginBottom: '2.5rem' }}>
              {product.description}
            </p>

            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)', marginBottom: '2.5rem', letterSpacing: '0.02em' }}>
              ${product.price.toFixed(2)}
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', width: 'fit-content', border: '1px solid var(--border)' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{
                  width: '40px', height: '40px', background: 'transparent',
                  border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                  fontSize: '1.2rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>−</button>
                <span style={{ width: '48px', textAlign: 'center', color: 'var(--text-primary)', fontSize: '0.85rem', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', lineHeight: '40px' }}>
                  {quantity}
                </span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} style={{
                  width: '40px', height: '40px', background: 'transparent',
                  border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                  fontSize: '1.2rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} disabled={product.stock === 0 || adding} style={{
              background: product.stock === 0 ? 'transparent' : 'var(--gold)',
              border: '1px solid var(--gold)',
              color: product.stock === 0 ? 'var(--gold)' : 'var(--obsidian)',
              padding: '1rem 2.5rem', fontSize: '0.7rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              fontFamily: 'Raleway, sans-serif', fontWeight: 500,
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s', opacity: adding ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              width: '100%', maxWidth: '320px',
            }}>
              {adding ? <><div className="loading-spinner" style={{ width: '16px', height: '16px' }} /> Adding...</>
                : product.stock === 0 ? 'Sold Out'
                  : <><ShoppingCart className="h-4 w-4" /> Add to Selection</>}
            </button>

            {/* Assurances */}
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <Shield className="h-4 w-4" />, text: '5-year movement warranty included' },
                { icon: <Award className="h-4 w-4" />, text: 'Certificate of authenticity provided' },
                { icon: <Clock className="h-4 w-4" />, text: 'Free global shipping on all timepieces' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
