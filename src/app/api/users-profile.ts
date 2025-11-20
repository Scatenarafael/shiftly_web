import { api } from '@/lib/axios';
import type { ProfileResponseProps } from '@/lib/types';

export async function getProfile() {
  const response = await api.get<ProfileResponseProps>('auth/me');

  return response.data;
}
