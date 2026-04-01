import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock } from 'lucide-react';
import { useQuery } from 'react-query';
import { ordersAPI } from '../services/api';

const statusColors: Record<string, string> = {
  pending: '#C9A84C', processing: '#7C9EC9', shipped: '#7CC99E', delivered: '#4CAF7C', cancelled: '#C9704C',
};

const Orders: React.FC = () => {
  const { data, isLoading } = useQuery('orders', () => ordersAPI.getOrders());
  const orders = data?.data.orders || [];

  if (isLoading) return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-spinner" style={{ width: '40px', height: '40px' }} />
    </div>
  );

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--deep)', borderBottom: '1px solid var(--border)', padding: '4rem 2rem 3rem', textAlign: 'center' }}>
        <span className="section-label mb-4">Your</span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', margin: '1rem 0' }}>Orders</h1>
        <div style={{ width: '50px', height: '1px', background: 'var(--gold)', margin: '0 auto' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <Package style={{ color: 'var(--text-muted)', margin: '0 auto 1.5rem' }} className="h-16 w-16" />
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '1rem' }}>No orders yet</h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto 1.5rem' }} />
            <Link to="/products" style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: '2px' }}>
              Explore Collection
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {orders.map((order: any) => (
              <div key={order.id} style={{ background: 'var(--surface)', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order</span>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'var(--text-primary)', margin: '0.25rem 0' }}>#{order.id}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                      <Clock className="h-3 w-3" />
                      <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: statusColors[order.status] || 'var(--text-muted)',
                      border: `1px solid ${statusColors[order.status] || 'var(--border)'}`,
                      padding: '0.3rem 0.75rem', display: 'inline-block', marginBottom: '0.5rem',
                    }}>{order.status}</span>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: 'var(--gold)' }}>${parseFloat(order.totalAmount).toFixed(2)}</p>
                  </div>
                </div>
                {order.items && order.items.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {order.items.map((item: any) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>{item.productName} <span style={{ color: 'var(--text-muted)' }}>× {item.quantity}</span></span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>${parseFloat(item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
