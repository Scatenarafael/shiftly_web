import type { FieldError } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface IFormErrorMessageProps {
  error?: { message: string } | FieldError;
  className?: string;
}

export function FormErrorMessage({ error, className }: IFormErrorMessageProps) {
  return (
    <p className={cn('m-0 p-0 text-xs text-red-500', className)}>
      {' '}
      {error && ` *${error?.message}`}
    </p>
  );
}
