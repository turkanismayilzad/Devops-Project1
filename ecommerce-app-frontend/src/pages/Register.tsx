import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await authAPI.register({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password });
      login(res.data.user, res.data.token);
      toast.success('Welcome to Chronos');
      navigate('/');
    } catch {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Alexandre' },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Dupont' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="text-center mb-12">
          <span className="section-label mb-4">Join Us</span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', margin: '1rem 0' }}>
            Create Account
          </h1>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {fields.map(f => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {f.label}
              </label>
              <input
                type={f.type} name={f.name}
                value={form[f.name as keyof typeof form]}
                onChange={handleChange} required
                className="input" placeholder={f.placeholder}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={{
            background: loading ? 'var(--gold-dark)' : 'var(--gold)',
            color: 'var(--obsidian)', padding: '1rem', fontSize: '0.7rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            fontFamily: 'Raleway, sans-serif', fontWeight: 500,
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s', marginTop: '0.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            {loading ? <><div className="loading-spinner" style={{ width: '16px', height: '16px' }} /> Creating Account...</> : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-8" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
          Already a member?{' '}
          <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: '1px' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
