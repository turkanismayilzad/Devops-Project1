import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      login(res.data.user, res.data.token);
      toast.success('Welcome back');
      navigate('/');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="text-center mb-12">
          <span className="section-label mb-4">Welcome</span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', margin: '1rem 0' }}>
            Sign In
          </h1>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" placeholder="your@email.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} style={{
            background: loading ? 'var(--gold-dark)' : 'var(--gold)',
            color: 'var(--obsidian)', padding: '1rem', fontSize: '0.7rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            fontFamily: 'Raleway, sans-serif', fontWeight: 500,
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s', marginTop: '0.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            {loading ? <><div className="loading-spinner" style={{ width: '16px', height: '16px' }} /> Signing In...</> : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
          New to Chronos?{' '}
          <Link to="/register" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: '1px' }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
