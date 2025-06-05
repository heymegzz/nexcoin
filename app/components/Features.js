const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header">
          <h2 className="section-title">Powerful Features for Crypto Traders</h2>
          <p className="section-subtitle">Everything you need to manage your crypto portfolio in one place</p>
        </div>

        <div className="features-wrapper">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚡️</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Real-Time Tracking</h3>
              <p>Monitor your crypto portfolio in real-time across multiple exchanges and wallets</p>
              <ul className="feature-list">
                <li>Live price updates</li>
                <li>Portfolio performance metrics</li>
                <li>Customizable watchlists</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🛡️</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Enterprise Security</h3>
              <p>Bank-grade encryption and advanced security measures</p>
              <ul className="feature-list">
                <li>Two-factor authentication</li>
                <li>Biometric login support</li>
                <li>Cold storage integration</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🌐</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Cross-Platform Access</h3>
              <p>Access your portfolio anywhere, anytime with our mobile-friendly platform</p>
              <ul className="feature-list">
                <li>iOS & Android apps</li>
                <li>Desktop synchronization</li>
                <li>Offline mode support</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📈</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Advanced Analytics</h3>
              <p>Detailed charts and analytics for informed decisions</p>
              <ul className="feature-list">
                <li>Technical indicators</li>
                <li>Market sentiment analysis</li>
                <li>Custom alerts & notifications</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🤖</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Auto Trading</h3>
              <p>Automate your trading strategies with ease</p>
              <ul className="feature-list">
                <li>Custom trading bots</li>
                <li>Strategy backtesting</li>
                <li>Risk management tools</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💰</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Tax Reporting</h3>
              <p>Simplified crypto tax reporting and compliance</p>
              <ul className="feature-list">
                <li>Automated tax forms</li>
                <li>Transaction history export</li>
                <li>Multi-jurisdiction support</li>
              </ul>
            </div>
          </div>

          <div className="features-decoration">
            <div className="crypto-grid">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="crypto-dot"></div>
              ))}
            </div>
            <div className="floating-cards">
              <div className="floating-card card-1"></div>
              <div className="floating-card card-2"></div>
              <div className="floating-card card-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 