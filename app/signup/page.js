'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const terms = formData.get('terms');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!terms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, firstName, lastName);
      router.push('/markets');
    } catch (err) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please try logging in instead.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters long.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="main-content">
        <div className="auth-container">
          <h1 className="auth-title">Create an Account</h1>
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group half">
                <label className="form-label" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="First name"
                  autoComplete="given-name"
                  required
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
                  name="last-name"
                  placeholder="Last name"
                  autoComplete="family-name"
                  required
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
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
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
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                required
                minLength="6"
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
                name="confirm-password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                minLength="6"
              />
            </div>
            
            <div className="form-group-row">
              <div className="checkbox-container">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="form-checkbox"
                  required
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
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
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
