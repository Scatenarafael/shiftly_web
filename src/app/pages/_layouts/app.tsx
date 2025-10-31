/* eslint-disable @typescript-eslint/no-explicit-any */
import { signOut } from '@/app/api/sign-out';
import { Header } from '@/components/header';
import { NavMenu } from '@/components/nav-menu';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/lib/axios';
import { type AxiosError, isAxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

export function AppLayout() {
  const { profileRefetch } = useContext(AuthContext);

  const path = useLocation();
  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    profileRefetch();

    let refreshing = false;

    const interceptorId = api.interceptors.response.use(
      (response) => {
        return response;
      },
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      async (error: AxiosError<any>) => {
        if (
          error.response?.status === 401 &&
          error.response.data.detail ===
            'Authentication credentials were not provided.'
        ) {
          if (!refreshing) {
            refreshing = true;
            api
              .post('/jwt/refresh/')
              .then((response) => {
                if (isAxiosError(response)) {
                  refreshing = false;
                  signOut().then(() => {
                    navigate('/sign-in', { replace: true });
                  });
                } else {
                  profileRefetch();
                }
              })
              .catch(() => {
                refreshing = false;
                navigate('/sign-in', { replace: true });
              })
              .finally(() => {
                refreshing = false;
              });
          } else {
            refreshing = false;
            return error;
          }
        } else {
          if (!refreshing && error.response?.status === 401) {
            refreshing = true;
            // signOut().then(() => {
            navigate('/sign-in', { replace: true });
            // })
          } else {
            return error;
          }
        }
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [path.pathname]);

  return (
    <div className="flex min-h-screen flex-1 antialiased">
      <NavMenu />
      <div className="flex flex-1 flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
