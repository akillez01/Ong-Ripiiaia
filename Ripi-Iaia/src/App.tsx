import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import FooterAudioPlayer from './components/FooterAudioPlayer';
import PageLayout from './components/layout/PageLayout';
import { PostForm } from './components/PostForm';
import ProtectedRoute from './components/ProtectedRoute';
import { AudioPlayerProvider, useAudioPlayer } from './context/AudioPlayerContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AcervoPage from './pages/AcervoPage';
import AdminBooksPage from './pages/AdminBooksPage';
import AdminHymnsPage from './pages/AdminHymnsPage';
import AdminPostsPage from './pages/AdminPostsPage';
import AdminVideosPage from './pages/AdminVideosPage';
import Biblioteca from './pages/Biblioteca';
import BlogPage from './pages/BlogPage';
import ContatoPage from './pages/ContatoPage';
import HomePage from './pages/HomePage';
import LivePage from './pages/LivePage';
import LoginPage from './pages/LoginPage';
import LojaPage from './pages/LojaPage';
import PostDetailPage from './pages/PostDetailPage';
import RadioPage from './pages/RadioPage';
import RegisterPage from './pages/RegisterPage';
import VideoAulasPage from './pages/VideoAulasPage';

function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      // Redirecionamentos baseados na autenticação
      if (isAuthenticated && ['/login', '/register'].includes(location.pathname)) {
        navigate('/');
      } else if (!isAuthenticated && location.pathname.startsWith('/admin')) {
        navigate('/login', { state: { from: location.pathname } });
      }
    };
    checkUser();
  }, [isAuthenticated, navigate, location.pathname]);

  return null;
}

function GlobalFooterPlayer() {
  const { footerPlayer, setFooterPlayer } = useAudioPlayer();
  if (!footerPlayer) return null;
  return (
    <FooterAudioPlayer
      audioUrl={footerPlayer.audioUrl}
      title={footerPlayer.title}
      artist={footerPlayer.artist}
      coverImage={footerPlayer.coverImage}
      onClose={() => setFooterPlayer(null)}
    />
  );
}

function AdminRoutes() {
  return (
    <>
      <Route
        path="/admin/posts"
        element={
          <ProtectedRoute>
            <AdminPostsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/posts/new"
        element={
          <ProtectedRoute>
            <PageLayout>
              <PostForm 
                onCancel={() => window.history.back()} 
                onSubmit={(data) => {
                  // Lógica para enviar o post
                  console.log(data);
                  window.history.back();
                }} 
              />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/posts/edit/:id"
        element={
          <ProtectedRoute>
            <PageLayout>
              <PostForm 
                onCancel={() => window.history.back()} 
                onSubmit={(data) => {
                  // Lógica para atualizar o post
                  console.log(data);
                  window.history.back();
                }} 
              />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/videos"
        element={
          <ProtectedRoute>
            <AdminVideosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hymns"
        element={
          <ProtectedRoute>
            <AdminHymnsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/books"
        element={
          <ProtectedRoute>
            <AdminBooksPage />
          </ProtectedRoute>
        }
      />
    </>
  );
}

function AppContent() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rotas com layout comum */}
      <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
      <Route path="/acervo/*" element={<PageLayout><AcervoPage /></PageLayout>} />
      <Route path="/radio" element={<PageLayout><RadioPage /></PageLayout>} />
      <Route path="/live" element={<PageLayout><LivePage /></PageLayout>} />
      <Route path="/videoaulas" element={<PageLayout><VideoAulasPage /></PageLayout>} />
      <Route path="/biblioteca" element={<PageLayout><Biblioteca /></PageLayout>} />
      <Route path="/loja" element={<PageLayout><LojaPage /></PageLayout>} />
      <Route path="/contato" element={<PageLayout><ContatoPage /></PageLayout>} />
      
      {/* Rotas do Blog */}
      <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
      <Route path="/blog/:id" element={<PageLayout><PostDetailPage /></PageLayout>} />
      
      {/* Rotas administrativas */}
      {AdminRoutes()}
      
      {/* Rota de fallback */}
      <Route path="*" element={<PageLayout><HomePage /></PageLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AudioPlayerProvider>
        <AuthProvider>
          <AuthHandler />
          <AppContent />
          <GlobalFooterPlayer />
        </AuthProvider>
      </AudioPlayerProvider>
    </Router>
  );
}

export default App;