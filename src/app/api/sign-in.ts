import { api } from '@/lib/axios';

interface SignInProps {
  data: {
    email: string;
    password: string;
  };
}

export async function signIn({ data }: SignInProps) {
  const response = await api.post('auth/login', data);

  return response;
}
