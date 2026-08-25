import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Today from './pages/Today';
import Chat from './pages/Chat';
import Music from './pages/Music';
import Poetry from './pages/Poetry';
import Settings from './pages/Settings';
import { Login } from './pages/Login';

export interface Song {
  title: string;
  artist: string;
  duration: string;
  file: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem('bloom_current_user');
  });

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('bloom_current_user');
    if (savedUser && !currentUser) {
      setCurrentUser(savedUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
    } else {
      audioRef.current.pause();
    }

    if ('mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: 'Bloom',
        artwork: [{ src: '/logo.png', sizes: '512x512', type: 'image/png' }]
      });

      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSelectUser = (user: 'daksh' | 'her') => {
    localStorage.setItem('bloom_current_user', user);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('bloom_current_user');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onSelectUser={handleSelectUser} />;
  }

  return (
    <BrowserRouter>
      <audio
        ref={audioRef}
        src={currentSong?.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Today currentUser={currentUser} />} />
          <Route path="/chat" element={<Chat currentUser={currentUser} />} />
          <Route 
            path="/music" 
            element={
              <Music 
                currentUser={currentUser}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentTime={currentTime}
                duration={duration}
                handleSeek={handleSeek}
              />
            } 
          />
          <Route path="/poetry" element={<Poetry currentUser={currentUser} />} />
          <Route path="/settings" element={<Settings currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;