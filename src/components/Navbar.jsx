import { Link, useLocation } from 'react-router-dom';
import LoginButton from './LoginButton';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <div className="logo-placeholder">
              <div className="cyberpunk-logo">
                <div className="logo-text gradient-text">KV</div>
                <div className="logo-heart">♥</div>
              </div>
            </div>
            <span className="logo-text-main gradient-text">ShokWav.gg</span>
          </div>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/servers"
              className={`nav-link ${location.pathname === '/servers' ? 'active' : ''}`}
            >
              Servers
            </Link>
          )}
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/embed-creator"
            className={`nav-link ${location.pathname === '/embed-creator' ? 'active' : ''}`}
          >
            Embed Creator
          </Link>
          <LoginButton />
          <a
            href="https://discord.com/oauth2/authorize?client_id=1465779916518723796&permissions=8&integration_type=0&scope=bot"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Invite Bot
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
