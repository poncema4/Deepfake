import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo_white.png" alt="RealEyes Logo" />
        <span>Deepfake Awareness and Detection</span>
      </div>
      <div className="nav-links">
        {isLandingPage ? (
          <>
            <a href="#what">What Are Deepfakes?</a>
            <a href="#uses">Uses</a>
            <a href="#detect">Detection</a>
          </>
        ) : (
          <Link to="/">Article</Link>
        )}
        <Link to="/challenge">Challenge</Link>
        <Link to="/model">Try Our Model</Link>
        <Link to ="/about">About Us</Link>
      </div>
    </nav>
  );
}
