import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <main className="max-w-md mx-auto min-h-screen pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}