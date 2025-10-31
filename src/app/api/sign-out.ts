import { api } from '@/lib/axios';

export async function signOut() {
  const response = await api.post('sign-out/');

  return response;
}
