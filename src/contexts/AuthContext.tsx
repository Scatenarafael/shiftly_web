
import {
  type QueryObserverResult,
  type RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
// eslint-disable-next-line
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';
import { toast } from 'sonner';

import type { ProfileResponseProps } from '@/lib/types';
import { capitalizeString } from '@/lib/constants';
import { isAxiosError } from 'axios';
import { getProfile } from '@/app/api/users-profile';
import { signOut } from '@/app/api/sign-out';

type AuthContextData = {
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
  profile: ProfileResponseProps | null;
  signOutFn: () => void;
  isLoadingProfile: boolean;
  profileRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ProfileResponseProps, Error>>;
  showNavMenu: boolean;
  setShowNavMenu: Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState<ProfileResponseProps | null>(null);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const {
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    refetch: profileRefetch,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return getProfile().then((response) => {
        if (response) {
          setProfile(response);
        }
        return response;
      });
    },
  });

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: async () => {
      signOut().then(() => {
        setProfile(null);
      });
    },
    onSuccess: () => {
      window.location.replace('/sign-in');
      toast.success('Successfully Logout');
    },
    onError: (errors) => {
      if (isAxiosError(errors)) {
        const errorEntries = Object.entries(errors.response?.data);
        for (const [key, value] of errorEntries) {
          toast.error(
            // biome-ignore lint/style/useTemplate: <explanation>
            'Could not log out! ' + capitalizeString(key) + ': ' + value,
          );
        }
      } else {
        // biome-ignore lint/style/useTemplate: <explanation>
        toast.error('Could not log out! Details: ' + errors.message);
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        profile,
        signOutFn,
        isLoadingProfile: isLoadingProfile || isFetchingProfile,
        profileRefetch,
        setShowNavMenu,
        showNavMenu,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
