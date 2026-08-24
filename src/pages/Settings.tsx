import { useState, useEffect } from 'react';
import { Bell, ShieldCheck, Check, LogOut } from 'lucide-react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

interface SettingsProps {
  currentUser: string;
  onLogout: () => void;
}

export default function Settings({ currentUser, onLogout }: SettingsProps) {
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'dark');
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('app-reminders');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const isDaksh = currentUser === 'daksh';
  // Dynamic names and avatars based on POV
  const profileName = isDaksh ? 'Daksh' : 'Mansi';
  const profileInitial = isDaksh ? 'D' : 'M';

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Handle logout with local storage cache cleanup
  const handleLogoutClick = () => {
    localStorage.removeItem('bloom_current_user');
    onLogout();
  };

  const handleReminderToggle = async () => {
    const nextState = !reminders;
    setReminders(nextState);
    localStorage.setItem('app-reminders', JSON.stringify(nextState));

    if (!Capacitor.isNativePlatform()) return;

    try {
      if (nextState) {
        const permStatus = await LocalNotifications.requestPermissions();
        if (permStatus.display !== 'granted') return;

        const quotes = [
          "Just a reminder that you mean the world to me! ❤️",
          "Hope your day is as bright and lovely as your smile.",
          "Thinking of you and sending you the biggest hug today!",
          "Every moment with you is a favorite moment. Have a wonderful day!",
          "You are my favorite thought of the day, every single day.",
          "Just checking in to make sure you're smiling today! 😊",
          "No matter how far apart we are, you're always right here in my heart.",
          "Sending a little pocket full of sunshine your way.",
          "You make ordinary days feel like pure magic.",
          "Take a deep breath, drink some water, and remember I love you!",
          "I hope your day is going as wonderfully as you are.",
          "You are my absolute favorite person in the whole universe.",
          "Just a random reminder: You are deeply loved and appreciated.",
          "Thinking of your laugh and smiling to myself.",
          "You bring so much light and joy into my life.",
          "I hope something makes you smile really big today.",
          "You're doing amazing, and I'm so proud of you!",
          "Can't wait until I can hold you close again.",
          "You are my peace in the middle of a busy day.",
          "Sending you a warm hug through the screen! 🤗",
          "Just a gentle reminder to take a break and rest for a bit.",
          "You are the best part of my story.",
          "Life is so much sweeter with you in it.",
          "Thinking about you and missing your face right now.",
          "You deserve all the happiness in the world today.",
          "Whatever you're facing today, you've got this—and you've got me.",
          "Just a quick note to say: I love you more than words can say.",
          "Your happiness means everything to me.",
          "Hoping your day is filled with little moments of joy.",
          "You are my sunshine on a cloudy day.",
          "Just wanted to drop by and remind you how special you are.",
          "Every single day with you is a gift.",
          "I'm so lucky to call you mine.",
          "Sending you endless love and warm thoughts today.",
          "You look gorgeous today (even if I can't see you right now)! ✨",
          "Just a reminder to breathe, relax, and smile.",
          "You're always on my mind and forever in my heart.",
          "May your day be as lovely and warm as your heart.",
          "I am endlessly grateful for you.",
          "Thinking of you is my favorite distraction.",
          "You make my heart happy just by existing.",
          "Sending you virtual hugs and soft kisses.",
          "Just a little love note to brighten your day.",
          "You are capable of wonderful things today!",
          "I'm cheering for you, always and forever.",
          "Let's grab our favorite drink together soon!",
          "You're my favorite reason to look forward to tomorrow.",
          "Just checking in on my favorite person.",
          "Your smile has the power to light up the whole room.",
          "I love the way you make me feel.",
          "Hope your day is treating you as wonderfully as you treat me.",
          "You are loved more than you'll ever know.",
          "Just a reminder that you're doing great.",
          "Thinking of our best memories together today.",
          "You are my safe place in this crazy world.",
          "Sending a gentle reminder that I'm always on your side.",
          "May your day be filled with peace and sweet moments.",
          "I love you in the morning, in the afternoon, and underneath the stars.",
          "You're poetry in motion, even on ordinary days.",
          "Just a little reminder of how much you are cherished.",
          "You make everything better just by being you.",
          "Hope you're taking good care of yourself today!",
          "Sending you a soft breeze of love across the miles.",
          "You are my favorite daydream.",
          "Just a sweet note to say I'm thinking of you.",
          "Your heart is pure gold, don't ever forget it.",
          "Wishing you a calm, beautiful, and happy day.",
          "You are the melody stuck in my head that I never want to leave.",
          "Just a reminder to smile—you look amazing when you do.",
          "I'm so proud of everything you are and everything you do.",
          "Sending you a cozy hug for a chilly or busy day.",
          "You are my favorite chapter of life.",
          "Just stopping by your thoughts to say hello and I love you.",
          "May your coffee be strong and your day be stress-free.",
          "You are my home, no matter where we are.",
          "Just a reminder that you hold my entire heart.",
          "Thinking of the next time we'll see each other.",
          "You bring a quiet sort of magic to my everyday life.",
          "Hope you take a moment to appreciate how wonderful you are today.",
          "Sending oceans of love straight to your heart.",
          "You are my favorite person to talk to about everything.",
          "Just a quick reminder: You are enough, exactly as you are.",
          "May your day be wrapped in comfort and joy.",
          "I love you past the stars and back.",
          "Just checking in to send some positive energy your way.",
          "You are the sweetest part of my routine.",
          "Thinking of you makes even the hardest days easier.",
          "Sending you a gentle reminder of how deeply cared for you are.",
          "You're my favorite notification to get.",
          "Hope you're having a smooth and pleasant day.",
          "You are my dream come true.",
          "Just a little reminder to take things one step at a time.",
          "I love you today, tomorrow, and forever.",
          "You make my world infinitely brighter.",
          "Sending you warm thoughts and cozy vibes.",
          "Just a friendly reminder that you are incredible.",
          "May your heart feel light and your mind feel at peace today.",
          "You are my favorite person to miss and my favorite person to see.",
          "Just a reminder: I'm always rooting for you.",
          "I love you more than all the stars in the sky."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        const now = new Date();
        const targetTime = new Date();
        targetTime.setHours(10, 0, 0, 0);
        if (now > targetTime) targetTime.setDate(targetTime.getDate() + 1);

        await LocalNotifications.schedule({
          notifications: [{
            title: "Gentle Reminder 💌",
            body: randomQuote,
            id: 101,
            schedule: { at: targetTime, every: 'day' }
          }]
        });
      } else {
        await LocalNotifications.cancel({ notifications: [{ id: 101 }] });
      }
    } catch (error) {
      console.error("Error setting notification:", error);
    }
  };

  const handleThemeChange = (mode: string) => {
    setTheme(mode);
    document.body.className = mode;
    localStorage.setItem('app-theme', mode);
  };

  const themes = [
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'pastel', name: 'Pastel' },
    { id: 'ocean', name: 'Ocean' },
  ];

  return (
    <div className="p-6 pt-12 pb-32 flex flex-col gap-6">
      <div>
        <span className="text-[10px] font-semibold tracking-wider text-lavender uppercase">
          Make it yours
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-0.5" style={{ color: 'var(--text-main)' }}>
          Settings
        </h1>
      </div>

      {/* Dynamic Profile Account Card with D/M Avatar */}
      <div 
        className="border rounded-2xl p-4 flex items-center justify-between transition-colors"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lavender/20 text-lavender font-bold flex items-center justify-center text-lg">
            {profileInitial}
          </div>
          <div>
            <h4 className="text-sm font-semibold capitalize" style={{ color: 'var(--text-main)' }}>
              {profileName}
            </h4>
            <p className="text-xs opacity-70">Active Profile ({currentUser})</p>
          </div>
        </div>
        <button
          onClick={handleLogoutClick}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      {/* Appearance / Theme Engine */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Appearance</h3>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => handleThemeChange(t.id)}
              className="p-4 rounded-2xl border flex items-center justify-between transition-all"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: theme === t.id ? '#C0A0FD' : 'var(--card-border)',
                opacity: theme === t.id ? 1 : 0.85
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full ${
                  t.id === 'light' ? 'bg-white border border-gray-400' : 
                  t.id === 'dark' ? 'bg-lavender' : 
                  t.id === 'pastel' ? 'bg-pastelPink' : 'bg-oceanTeal'
                }`} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-main)' }}>{t.name}</span>
              </div>
              {theme === t.id && <Check size={16} className="text-lavender" />}
            </button>
          ))}
        </div>
      </div>

      {/* Preferences Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Preferences</h3>

        {/* Gentle Reminders Card */}
        <div 
          className="border rounded-2xl p-4 flex items-center justify-between transition-colors"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-lavender/10 text-lavender flex items-center justify-center">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Gentle reminders</h4>
              <p className="text-xs opacity-70">Daily quote at 10:00 AM</p>
            </div>
          </div>
          <button 
            onClick={handleReminderToggle}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${reminders ? 'bg-lavender' : 'bg-gray-800'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-darkBg transition-transform ${reminders ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Privacy Card */}
        <div 
          className="border rounded-2xl p-4 flex items-center justify-between transition-colors"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Your privacy</h4>
              <p className="text-xs opacity-70">Only you and i have access of this app</p>
            </div>
          </div>
          <Check size={18} className="text-emerald-400" />
        </div>
      </div>
    </div>
  );
}