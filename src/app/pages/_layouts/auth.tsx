import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="flex bg-background text-accent-foreground h-screen min-h-screen flex-col antialiased">
      <Outlet />
    </div>
  );
}
