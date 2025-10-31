import type { createUserFormData } from '@/app/pages/app/users/create-user-dialog-form';
import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';

export async function registerUser(data: createUserFormData) {
  try {
    const response = await api.post('/register/', { ...data });

    if (isAxiosError(response)) {
      throw response;
    }
    return response.data;
  } catch (e) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw e;
  }
}
