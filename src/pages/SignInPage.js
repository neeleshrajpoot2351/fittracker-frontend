import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AuthPage.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    // Use email as username (adjust based on your backend)
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ submit: result.error || 'Login failed. Please check your credentials.' });
    }
  };

  return (
    <div id="signin-page">
      <header className="auth-header">
        <div className="container">
          <div className="header-content">
            <button className="btn btn--outline btn--sm" onClick={() => navigate('/')}>
              ← Back
            </button>
            <div className="logo">FitTracker Pro</div>
          </div>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-form">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Sign in to continue your fitness journey</p>

            <form id="signin-form" onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="error-message" style={{ color: '#ef4444', marginBottom: '16px' }}>
                  {errors.submit}
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn--primary btn--full-width" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;


