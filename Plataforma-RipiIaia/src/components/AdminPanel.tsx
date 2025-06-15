import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Você precisa estar logado como admin.');
      return;
    }
    fetch('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) setError(data.message);
        else setUsers(data);
      })
      .catch(() => setError('Erro ao buscar usuários.'));
  }, []);

  if (error) return <div style={{ color: 'red', margin: 20 }}>{error}</div>;
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Painel Admin - Usuários</h2>
      <table border={1} cellPadding={8} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
