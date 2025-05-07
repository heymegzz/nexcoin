import React from "react";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <main className="main">
      <Navbar />
      <div className="main-content">
        <div className="auth-container">
          <h1 className="auth-title">Login to NexCoin</h1>
          
          <form className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            
            <div className="form-group-row">
              <div className="checkbox-container">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="form-checkbox"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                  Remember me
                </label>
              </div>
              
              <div className="form-link-container">
                <a href="#" className="form-link">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div className="form-group">
              <button
                type="submit"
                className="form-button"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{" "}
              <a href="/signup" className="auth-footer-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}