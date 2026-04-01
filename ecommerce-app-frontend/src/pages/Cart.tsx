import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleRemove = async (itemId: number) => {
    try { await removeFromCart(itemId); toast.success('Item removed'); }
    catch { toast.error('Failed to remove item'); }
  };

  const handleQuantity = async (itemId: number, qty: number) => {
    if (qty < 1) return;
    try { await updateQuantity(itemId, qty); }
    catch { toast.error('Failed to update quantity'); }
  };

  if (items.length === 0) return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <ShoppingBag style={{ color: 'var(--text-muted)', margin: '0 auto 1.5rem' }} className="h-16 w-16" />
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '1rem' }}>Your selection is empty</h2>
        <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto 1.5rem' }} />
        <Link to="/products" style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: '2px' }}>
          Explore Collection
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--deep)', borderBottom: '1px solid var(--border)', padding: '4rem 2rem 3rem', textAlign: 'center' }}>
        <span className="section-label mb-4">Your</span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', margin: '1rem 0' }}>Selection</h1>
        <div style={{ width: '50px', height: '1px', background: 'var(--gold)', margin: '0 auto' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: 'var(--surface)', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to={`/products/${item.productId}`}>
                  <div style={{ width: '90px', height: '90px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>{item.productName}</span>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-primary)', margin: '0.25rem 0 0.75rem' }}>{item.productName}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid var(--border)', width: 'fit-content' }}>
                    <button onClick={() => handleQuantity(item.id, item.quantity - 1)} style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                    <span style={{ width: '40px', textAlign: 'center', color: 'var(--text-primary)', fontSize: '0.8rem', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', lineHeight: '32px' }}>{item.quantity}</span>
                    <button onClick={() => handleQuantity(item.id, item.quantity + 1)} style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'var(--gold)', marginBottom: '0.75rem' }}>${(item.productPrice * item.quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemove(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9704C')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', position: 'sticky', top: '120px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Order Summary</h3>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{item.productName} × {item.quantity}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>${(item.productPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Total</span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--gold)' }}>${total.toFixed(2)}</span>
              </div>
              <button onClick={() => navigate('/orders')} style={{
                width: '100%', background: 'var(--gold)', color: 'var(--obsidian)',
                padding: '1rem', fontSize: '0.7rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif', fontWeight: 500,
                border: 'none', cursor: 'pointer', transition: 'background 0.3s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}>
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => clearCart()} style={{
                width: '100%', background: 'transparent', color: 'var(--text-muted)',
                padding: '0.75rem', fontSize: '0.65rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif',
                border: 'none', cursor: 'pointer', marginTop: '0.75rem', transition: 'color 0.3s',
              }}>
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
