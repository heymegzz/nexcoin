import React from "react";
import Navbar from "../components/Navbar";

export default function Signup() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-black/50 p-8 rounded-lg border border-yellow-900/20">
          <h1 className="text-2xl font-light text-center mb-8 text-yellow-400">Create an Account</h1>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light mb-2" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className="w-full bg-black border border-yellow-900/30 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-white"
                  type="text"
                  id="first-name"
                  placeholder="First name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-light mb-2" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  className="w-full bg-black border border-yellow-900/30 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-white"
                  type="text"
                  id="last-name"
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-light mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full bg-black border border-yellow-900/30 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-white"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-light mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full bg-black border border-yellow-900/30 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-white"
                type="password"
                id="password"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-light mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                className="w-full bg-black border border-yellow-900/30 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-white"
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
              />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded accent-yellow-400"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-300">
                  I agree to the{" "}
                  <a href="#" className="text-yellow-400 hover:text-yellow-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-yellow-400 hover:text-yellow-300">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition-colors font-medium"
              >
                Create Account
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-300">
              Already have an account?{" "}
              <a href="/login" className="text-yellow-400 hover:text-yellow-300">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}