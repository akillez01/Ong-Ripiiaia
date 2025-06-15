import React, { useState } from 'react';

export default function Login({ onLogin, onClose }: { onLogin: (user: any, token: string) => void, onClose?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao logar');
      localStorage.setItem('token', data.token);
      onLogin(data.user, data.token);
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40" style={{paddingTop: '18vh'}} onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        {onClose && (
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold">×</button>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-primary-600 text-white rounded hover:bg-primary-700 transition">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
