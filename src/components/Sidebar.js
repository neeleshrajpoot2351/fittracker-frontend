import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Home' },
    { path: '/dashboard/goals', icon: '🎯', label: 'Goals' },
    { path: '/dashboard/statistics', icon: '📊', label: 'Statistics' },
    { path: '/dashboard/recommendations', icon: '💡', label: 'Recommendations' },
    { path: '/dashboard/profile', icon: '👤', label: 'Profile' },
    { path: '/dashboard/coach', icon: '🤖', label: 'Coach' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserName = () => {
    return user?.name || user?.username || user?.email || 'User';
  };

  const getUserEmail = () => {
    return user?.email || '';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">FitTracker Pro</div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.path}
            href="#"
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(item.path);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a href="#" className="nav-item logout" onClick={(e) => { e.preventDefault(); onLogout(); }}>
          <span className="nav-icon">🚪</span>
          Logout
        </a>
      </div>
      <div className="user-profile">
        <div className="user-avatar">{getInitials(getUserName())}</div>
        <div className="user-info">
          <div className="user-name">{getUserName()}</div>
          <div className="user-email">{getUserEmail()}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


