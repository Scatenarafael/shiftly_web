import { api } from '@/lib/axios';

export async function signOut() {
  const response = await api.post('auth/logout');

  console.log("logging out!!!")

  return response;
}
