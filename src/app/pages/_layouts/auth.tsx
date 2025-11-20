import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="flex bg-background h-screen min-h-screen flex-col antialiased">
      <Outlet />
    </div>
  );
}
