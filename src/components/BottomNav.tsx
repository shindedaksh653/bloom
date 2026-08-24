import { NavLink } from 'react-router-dom';
import { Sun, MessageCircle, Music, BookOpen, Settings } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { path: '/', label: 'Home', icon: Sun },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/music', label: 'Music', icon: Music },
    { path: '/poetry', label: 'Poetry', icon: BookOpen },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 backdrop-blur-md border-t border-gray-800/20 py-2 px-4 z-50 transition-colors duration-300 shadow-lg"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'text-lavender scale-105 font-bold' 
                    : 'opacity-60 hover:opacity-100'
                }`
              }
            >
              <Icon size={20} strokeWidth={2} />
              <span className="text-[10px] mt-1 tracking-wide">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}