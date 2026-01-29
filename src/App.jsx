import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EmbedCreator from './pages/EmbedCreator';
import Servers from './pages/Servers';
import AuthCallback from './pages/AuthCallback';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/embed-creator" element={<EmbedCreator />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
