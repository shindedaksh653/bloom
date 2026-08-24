import { useState } from 'react';
import { Sun, CloudRain, Heart, Moon, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TodayProps {
  currentUser: string;
}

export default function Today({ currentUser }: TodayProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const isDaksh = currentUser === 'daksh';

  // POV values
  const profileName = isDaksh ? 'Daksh' : 'Mansi';
  const profileInitial = isDaksh ? 'D' : 'M';

  const moods = [
    { id: 'Bright', label: 'Bright', icon: Sun },
    { id: 'Soft', label: 'Soft', icon: CloudRain },
    { id: 'Warm', label: 'Warm', icon: Heart },
    { id: 'Quiet', label: 'Quiet', icon: Moon },
  ];

  return (
    <div className="p-6 pt-12 pb-32 flex flex-col gap-6">
      
      {/* 1. Header: Home Title & Profile Badge */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold tracking-wider text-lavender uppercase">
            Home
          </span>
          <h1 className="text-3xl font-bold tracking-tight mt-1" style={{ color: 'var(--text-main)' }}>
            For You, {profileName}.
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center text-lavender font-bold text-lg">
          {profileInitial}
        </div>
      </div>

      {/* 2. Hero Card */}
      <div className="bg-lavender text-darkBg rounded-3xl p-6 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-[70%]">
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase mb-3 opacity-80">
            <Sun size={14} /> Your little space
          </div>
          <h2 className="text-2xl font-extrabold leading-tight mb-2">
            A softer place to land.
          </h2>
          <p className="text-xs opacity-90 leading-relaxed">
            Everything you share here stays with you.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/20 flex items-center justify-center pointer-events-none">
          <Heart size={48} className="text-white/60" />
        </div>
      </div>

      {/* 3. Daily Mood Tracker */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold opacity-80" style={{ color: 'var(--text-main)' }}>How are you feeling?</h3>
          <span className="text-xs opacity-60" style={{ color: 'var(--text-main)' }}>Today</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {moods.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all ${
                  isSelected 
                    ? 'bg-lavender text-darkBg border-lavender font-bold scale-105' 
                    : 'hover:opacity-80'
                }`}
                style={!isSelected ? { backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' } : {}}
              >
                <Icon size={22} className="mb-2" />
                <span className="text-xs">{m.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] opacity-60 text-center mt-1" style={{ color: 'var(--text-main)' }}>
          {selectedMood ? `Saved mood: ${selectedMood}` : 'Tap a feeling to save your mood'}
        </p>
      </div>

      {/* 4. Note Card / Daily Quote */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold opacity-80" style={{ color: 'var(--text-main)' }}>A note for you</h3>
          <ArrowUpRight size={16} className="opacity-60" style={{ color: 'var(--text-main)' }} />
        </div>
        <div 
          className="border rounded-3xl p-5 relative shadow-sm"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
        >
          <div className="text-lavender mb-3">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor">
              <path d="M0 16V10C0 6.66667 0.885417 4.04167 2.65625 2.125C4.42708 0.208333 6.77083 0 9.6875 0V3.125C7.96875 3.125 6.64583 3.61979 5.71875 4.60938C4.79167 5.59896 4.33333 6.90625 4.33333 8.53125H8.33333V16H0ZM11.6667 16V10C11.6667 6.66667 12.5521 4.04167 14.3229 2.125C16.0938 0.208333 18.4375 0 21.3542 0V3.125C19.6354 3.125 18.3125 3.61979 17.3854 4.60938C16.4583 5.59896 16 6.90625 16 8.53125H20V16H11.6667Z" />
            </svg>
          </div>
          <p className="text-base font-medium leading-relaxed mb-4" style={{ color: 'var(--text-main)' }}>
            “There is no hurry. You are exactly where you need to be.”
          </p>
          <span className="text-xs opacity-60" style={{ color: 'var(--text-main)' }}>— for today</span>
        </div>
      </div>

      {/* 5. Quick Action Shortcuts */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold opacity-80" style={{ color: 'var(--text-main)' }}>Keep creating</h3>
          <span className="text-xs text-lavender">View all</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/poetry" className="bg-lavender/10 border border-lavender/20 rounded-3xl p-4 flex flex-col gap-3 hover:bg-lavender/20 transition-colors">
            <span className="text-lavender"><Sun size={20} /></span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>Write a poem</span>
          </Link>
          <Link to="/music" className="bg-pastelPink/10 border border-pastelPink/20 rounded-3xl p-4 flex flex-col gap-3 hover:bg-pastelPink/20 transition-colors">
            <span className="text-pastelPink"><Moon size={20} /></span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>Play something</span>
          </Link>
        </div>
      </div>

    </div>
  );
}