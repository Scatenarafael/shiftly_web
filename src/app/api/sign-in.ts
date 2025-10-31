import { api } from '@/lib/axios';

interface SignInProps {
  data: {
    username: string;
    password: string;
  };
}

export async function signIn({ data }: SignInProps) {
  const response = await api.post('jwt/create/', data);

  return response;
}
