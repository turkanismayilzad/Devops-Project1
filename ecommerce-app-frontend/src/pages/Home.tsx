import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Award, Globe, Shield } from 'lucide-react';

const Home: React.FC = () => {
  const maisons = [
    { name: 'Swiss Precision', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600', count: 12, category: 'Electronics' },
    { name: 'Sport & Dive', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600', count: 8, category: 'Sports' },
    { name: 'Dress Watches', image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600', count: 15, category: 'Accessories' },
    { name: 'Complications', image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600', count: 6, category: 'Home' },
  ];

  const pillars = [
    { icon: <Clock className="h-6 w-6" />, title: 'Master Craft', desc: 'Each timepiece assembled by hand over hundreds of hours' },
    { icon: <Award className="h-6 w-6" />, title: 'Certified Authentic', desc: 'Every watch verified and accompanied by full provenance' },
    { icon: <Globe className="h-6 w-6" />, title: 'Global Sourcing', desc: 'Curated directly from the finest ateliers in Geneva and Tokyo' },
    { icon: <Shield className="h-6 w-6" />, title: '5-Year Warranty', desc: 'Complete service coverage including movement and case' },
  ];

  return (
    <div style={{ background: 'var(--obsidian)' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=1800)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.4) 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex items-center" style={{ minHeight: '92vh' }}>
          <div style={{ maxWidth: '560px' }}>
            <span className="section-label fade-in stagger-1 mb-6">New Arrival — Spring Collection 2025</span>
            <h1 className="fade-in stagger-2" style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 300,
              lineHeight: 1.05, color: 'var(--text-primary)',
              letterSpacing: '0.03em', marginBottom: '1.5rem', marginTop: '1.5rem',
            }}>
              Time Is The<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Only Luxury</em><br />
              That Matters
            </h1>
            <div className="fade-in stagger-3" style={{ marginBottom: '2.5rem' }}>
              <div style={{ width: '60px', height: '1px', background: 'var(--gold)', marginBottom: '1.5rem' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, letterSpacing: '0.05em' }}>
                Exceptional timepieces from the world's most prestigious ateliers.
                Each watch tells a story of mastery, heritage, and obsessive precision.
              </p>
            </div>
            <div className="fade-in stagger-4 flex flex-wrap gap-4">
              <Link to="/products" style={{
                background: 'var(--gold)', color: 'var(--obsidian)',
                padding: '0.9rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.3s',
              }}>
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/categories" style={{
                border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)',
                padding: '0.9rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s',
              }}>
                Our Maisons
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2" style={{
          writingMode: 'vertical-rl', color: 'var(--text-muted)',
          fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
        }}>
          Est. MCMXXI · Geneva · Tokyo · New York
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: 'var(--gold)', padding: '0.75rem 0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: '3rem',
          animation: 'marquee 20s linear infinite',
          whiteSpace: 'nowrap', color: 'var(--obsidian)',
          fontSize: '0.65rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif', fontWeight: 500,
        }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i}>Swiss Movements &nbsp;·&nbsp; Sapphire Crystal &nbsp;·&nbsp; Waterproof 300m &nbsp;·&nbsp; Free Global Shipping &nbsp;·&nbsp; 5-Year Warranty &nbsp;·&nbsp;</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* Collections */}
      <section className="py-24" style={{ background: 'var(--deep)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-4">Discover</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', marginTop: '1rem' }}>
              Our Collections
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {maisons.map((m, i) => (
              <Link key={i} to={`/products?category=${encodeURIComponent(m.category)}`}
                className="group relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img src={m.image} alt={m.name} className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.1) 60%)' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {m.count} pieces
                  </p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                    {m.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=1600)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.7)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center text-center" style={{ minHeight: '60vh' }}>
          <div>
            <span className="section-label mb-6">Featured — Limited Edition</span>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300,
              color: 'var(--text-primary)', letterSpacing: '0.05em',
              margin: '1rem 0 1.5rem',
            }}>
              The Perpetual Calendar<br />
              <em style={{ color: 'var(--gold)' }}>Tourbillon Grande</em>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              A masterwork of mechanical ingenuity. 487 components assembled in 800 hours of meticulous hand-finishing.
            </p>
            <Link to="/products" style={{
              border: '1px solid var(--gold)', color: 'var(--gold)',
              padding: '0.9rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s',
            }}>
              Discover More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="text-center" style={{ padding: '2rem 1rem' }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>{p.icon}</div>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  {p.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.7, letterSpacing: '0.04em' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', padding: '3rem 2rem' }}>
        <div className="max-w-7xl mx-auto text-center">
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.35em', color: 'var(--text-primary)' }}>
            CHRONOS
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '1rem auto' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            © 2025 Chronos Haute Horlogerie · All rights reserved
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
