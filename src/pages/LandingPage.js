import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div id="landing-page">
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">FitTracker Pro</div>
            <button className="btn btn--outline" onClick={() => navigate('/signin')}>
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">🚀 AI-Powered Fitness Revolution</div>
              <h1>FitTracker Pro</h1>
              <p className="hero-subtitle">
                AI-powered fitness tracking that adapts to your goals and maximizes your potential with intelligent insights
              </p>
              <div className="hero-buttons">
                <button className="btn btn--primary btn--lg" onClick={() => navigate('/signup')}>
                  Start Your Journey
                </button>
                <button className="btn btn--outline btn--lg" onClick={() => navigate('/signin')}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="features-header">
              <h2>Powered by AI Intelligence</h2>
              <p>Experience the future of fitness with personalized recommendations and intelligent tracking</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Smart Tracking</h3>
                <p>Automatically track workouts with AI-powered exercise recognition</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3>AI Coach</h3>
                <p>Get personalized workout recommendations based on your progress</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Goal Setting</h3>
                <p>Set and achieve fitness goals with intelligent milestone tracking</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Progress Analytics</h3>
                <p>Visualize your fitness journey with detailed progress analytics</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your Fitness?</h2>
              <p>
                Join thousands of users who have already revolutionized their fitness journey with AI-powered insights
              </p>
              <button className="btn btn--primary btn--lg" onClick={() => navigate('/signup')}>
                Get Started Free
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;


