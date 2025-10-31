import { api } from '@/lib/axios';
import type { ProfileResponseProps } from '@/lib/types';

export async function getProfile() {
  const response = await api.get<ProfileResponseProps>('/profile/');

  return response.data;
}
