import { useState } from 'react';
import AdminBooksPage from './AdminBooksPage';
import AdminHymnsPage from './AdminHymnsPage';
import AdminPostsPage from './AdminPostsPage';
import AdminVideosPage from './AdminVideosPage';

const tabs = [
  { name: 'Posts', component: <AdminPostsPage /> },
  { name: 'Vídeos', component: <AdminVideosPage /> },
  { name: 'Hinos', component: <AdminHymnsPage /> },
  { name: 'Livros', component: <AdminBooksPage /> },
];

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Painel Admin</h1>
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-t ${
              activeTab === idx
                ? 'bg-primary-600 text-white'
                : 'bg-primary-100 text-primary-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded-b shadow">{tabs[activeTab].component}</div>
    </div>
  );
};

export default AdminPanelPage;