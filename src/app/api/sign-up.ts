import { api } from '@/lib/axios';
import type { createUserFormData } from '../pages/auth/register';

export async function registerUser(data: createUserFormData) {
  const response = await api.post('users/register/', { ...data });
  return response.data;
}
