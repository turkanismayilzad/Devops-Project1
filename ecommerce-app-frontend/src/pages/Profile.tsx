import React, { useState } from 'react';
import { User, Mail, Edit2, Check, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' });

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(form);
      updateUser(res.data.user);
      toast.success('Profile updated');
      setEditing(false);
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--deep)', borderBottom: '1px solid var(--border)', padding: '4rem 2rem 3rem', textAlign: 'center' }}>
        <span className="section-label mb-4">Account</span>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', margin: '1rem 0' }}>My Profile</h1>
        <div style={{ width: '50px', height: '1px', background: 'var(--gold)', margin: '0 auto' }} />
      </div>

      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '3rem' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User style={{ color: 'var(--gold)' }} className="h-6 w-6" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: 'var(--text-primary)' }}>
                  {user?.firstName} {user?.lastName}
                </h2>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Member</span>
              </div>
            </div>
            {!editing ? (
              <button onClick={() => setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                <Edit2 className="h-3 w-3" /> Edit
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={handleSave} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--gold)', border: 'none', color: 'var(--obsidian)', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  <Check className="h-3 w-3" /> Save
                </button>
                <button onClick={() => setEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  <X className="h-3 w-3" /> Cancel
                </button>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'First Name', key: 'firstName', icon: <User className="h-4 w-4" />, type: 'text' },
              { label: 'Last Name', key: 'lastName', icon: <User className="h-4 w-4" />, type: 'text' },
              { label: 'Email Address', key: 'email', icon: <Mail className="h-4 w-4" />, type: 'email' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {field.label}
                </label>
                {editing ? (
                  <input type={field.type} value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="input" />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--gold)' }}>{field.icon}</span>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                      {form[field.key as keyof typeof form]}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
