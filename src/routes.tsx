import { createBrowserRouter } from 'react-router';
import { AppLayout } from './app/pages/_layouts/app';
import Page from './app/pages/app/page';
import { Error } from '@/error';
import { AuthLayout } from './app/pages/_layouts/auth';
import { SignIn } from './app/pages/auth/sign-in';
import { Register } from './app/pages/auth/register';
import { NotFound } from './404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Page /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <Register /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
