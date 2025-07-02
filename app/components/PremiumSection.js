"use client";

import { useAuth } from '../context/AuthContext';

const PremiumSection = () => {
  const { user } = useAuth();
  return (
    <section className="premium-section">
      <div className="premium-background">
        <div className="premium-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        <div className="premium-glow"></div>
      </div>

      <div className="container">
        <div className="premium-content">
          <div className="premium-badge">
            <span>Limited Time Offer</span>
          </div>
          
          <h2 className="premium-title">
            Unlock Premium Features
            <span className="premium-highlight">Free for 30 Days</span>
          </h2>
          
          <p className="premium-description">
            Experience the full power of our platform with all premium features unlocked.
            No credit card required.
          </p>

          <div className="premium-features-grid">
            <div className="premium-feature">
              <div className="premium-feature-icon">💎</div>
              <div className="premium-feature-content">
                <h3>Advanced Portfolio Analytics</h3>
                <p>Deep insights into your portfolio performance with AI-powered analysis</p>
              </div>
            </div>

            <div className="premium-feature">
              <div className="premium-feature-icon">🔔</div>
              <div className="premium-feature-content">
                <h3>Smart Price Alerts</h3>
                <p>Custom alerts with machine learning-based price prediction</p>
              </div>
            </div>

            <div className="premium-feature">
              <div className="premium-feature-icon">🤖</div>
              <div className="premium-feature-content">
                <h3>Trading Automation</h3>
                <p>Create and deploy automated trading strategies</p>
              </div>
            </div>
          </div>

          <div className="premium-cta">
            <button 
              className="premium-button disabled" 
              disabled 
              title="Coming Soon"
            >
              Start Free Trial
              <span className="button-shine"></span>
            </button>
            <p className="premium-note">✨ No credit card required • Cancel anytime</p>
          </div>

          <div className="premium-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">$2M+</span>
              <span className="stat-label">Daily Volume</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        <div className="premium-cards-decoration">
          <div className="premium-card card-front">
            <div className="card-content">
              <div className="card-chip"></div>
              <div className="card-number">**** **** **** ****</div>
              <div className="card-name">PREMIUM ACCESS</div>
            </div>
          </div>
          <div className="premium-card card-back"></div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;