import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Button } from './button';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div
        className={cn(
          'flex h-10 w-full items-center rounded-lg border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className="flex w-full h-full flex-1 rounded-lg border-0 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />
        {type === 'password' ? (
          showPassword ? (
            <Button
              type="button"
              variant="ghost"
              className="h-full w-10 p-0"
              onClick={() => {
                setShowPassword((state) => !state);
              }}
            >
              <Eye />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              className="h-full w-10 p-0"
              onClick={() => {
                setShowPassword((state) => !state);
              }}
            >
              <EyeOff />
            </Button>
          )
        ) : (
          <Fragment />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
