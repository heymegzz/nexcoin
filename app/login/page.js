import React from "react";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-black/50 p-8 rounded-lg border border-yellow-900/20">
          <h1 className="text-2xl font-light text-center mb-8 text-yellow-400">Login to NexCoin</h1>
          
          <form className="space-y-6">
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
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded accent-yellow-400"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-yellow-400 hover:text-yellow-300">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition-colors font-medium"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <a href="/signup" className="text-yellow-400 hover:text-yellow-300">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}