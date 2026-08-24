import React, { useState } from 'react';
import { Lock, User, Heart } from 'lucide-react';

interface LoginProps {
  onSelectUser: (user: 'daksh' | 'her') => void;
}

export const Login: React.FC<LoginProps> = ({ onSelectUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Exact matching for Mansi and Daksh credentials
    if (username === 'Mansi03' && password === '352008') {
      onSelectUser('her');
    } else if (username === 'Daksh26' && password === '352008') {
      onSelectUser('daksh');
    } else {
      setError('Incorrect username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg p-6 text-gray-100">
      <div className="max-w-md w-full bg-cardBg border border-cardBorder rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-lavender/10 text-lavender rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart size={24} className="fill-lavender/20" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-main)' }}>
            Welcome to Bloom
          </h1>
          <p className="text-xs text-gray-400">Enter your credentials to access your private space</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">Username</label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full bg-darkBg border border-cardBorder rounded-xl px-4 py-3 pl-10 text-sm text-gray-100 focus:outline-none focus:border-lavender transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-darkBg border border-cardBorder rounded-xl px-4 py-3 pl-10 text-sm text-gray-100 focus:outline-none focus:border-lavender transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-lavender hover:bg-lavender/90 text-darkBg font-bold rounded-xl transition-all shadow-lg shadow-lavender/10 mt-2 text-sm"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-[11px] text-gray-500">
           An app made for you from my side.
          </p>
        </div>

      </div>
    </div>
  );
};