import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Today from './pages/Today';
import Chat from './pages/Chat';
import Music from './pages/Music';
import Poetry from './pages/Poetry';
import Settings from './pages/Settings';
import { Login } from './pages/Login';

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem('bloom_current_user');
  });

  // Keep user synced across reloads/app restarts
  useEffect(() => {
    const savedUser = localStorage.getItem('bloom_current_user');
    if (savedUser && !currentUser) {
      setCurrentUser(savedUser);
    }
  }, [currentUser]);

  const handleSelectUser = (user: 'daksh' | 'her') => {
    localStorage.setItem('bloom_current_user', user);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('bloom_current_user');
    setCurrentUser(null);
  };

  // If no user is logged in, show the Login screen
  if (!currentUser) {
    return <Login onSelectUser={handleSelectUser} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Today currentUser={currentUser} />} />
          <Route path="/chat" element={<Chat currentUser={currentUser} />} />
          <Route path="/music" element={<Music currentUser={currentUser} />} />
          <Route path="/poetry" element={<Poetry currentUser={currentUser} />} />
          <Route path="/settings" element={<Settings currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;