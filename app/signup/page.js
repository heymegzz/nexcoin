import React from "react";
import Navbar from "../components/Navbar";

export default function Signup() {
 
  return (
    <main className="main">
      <Navbar />
      <div className="main-content">
        <div className="auth-container">
          <h1 className="auth-title">Create an Account</h1>
          
          <form className="auth-form">
            <div className="form-row">
              <div className="form-group half">
                <label className="form-label" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="first-name"
                  placeholder="First name"
                  autoComplete="given-name"
                />
              </div>
              
              <div className="form-group half">
                <label className="form-label" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="last-name"
                  placeholder="Last name"
                  autoComplete="family-name"
                />
              </div>
            </div>
            
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
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                className="form-input"
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
            </div>
            
            <div className="form-group-row">
              <div className="checkbox-container">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="form-checkbox"
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <button
                type="submit"
                className="form-button"
              >
                Create Account
              </button>
            </div>
          </form>
          
          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{" "}
              <a href="/login" className="auth-footer-link">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}