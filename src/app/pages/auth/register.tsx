import { registerUser } from '@/app/api/sign-up';
import { FormErrorMessage } from '@/components/form-error-message';
import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { capitalizeString } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { CalendarCogIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import * as zod from 'zod';

const CreateUserSchema = zod
  .object({
    first_name: zod.string().min(1, 'Type username.'),
    last_name: zod.string().min(1, 'Type username.'),
    email: zod.email(),
    password: zod.string(),
    re_password: zod.string(),
    active: zod.boolean()
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.re_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['password'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['re_password'],
      });
    }
  });

export type createUserFormData = zod.infer<typeof CreateUserSchema>;

export function Register() {
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<createUserFormData>({
    resolver: zodResolver(CreateUserSchema),
    values: {
      email: '',
      password: '',
      re_password: '',
      first_name: '',
      last_name: '',
      active: true
    },
  });

  const createUserMutation = useMutation({
    mutationFn: registerUser,
    onError: (errors) => {
      if (isAxiosError(errors)) {
        const errorEntries = Object.entries(errors.response?.data);
        for (const [key, value] of errorEntries) {
          toast.error(
            // biome-ignore lint/style/useTemplate: <explanation>
            'Could not create user! ' +
              capitalizeString(key) +
              ' error: ' +
              value,
          );
        }
      } else {
        // biome-ignore lint/style/useTemplate: <explanation>
        toast.error('Could not create user! Error: ' + errors.message);
      }
    },
    onSuccess: () => {
      toast.success('User successfully created!');
      navigate('/sign-in', { replace: true });
      reset();
    },
  });

  function handleCreateUser(data: createUserFormData) {
    createUserMutation.mutate(data);
  }

  return (
    <div className="flex h-full flex-1 flex-col lg:flex-row">
      <div className="relative flex w-full items-center justify-center bg-linear-to-r from-foreground to-primary/70 dark:from-primary/70 dark:to-foreground lg:w-1/3">
        <div className="absolute left-2 top-4 lg:top-10">
          <ModeToggle />
        </div>
        <div className="flex items-center gap-4 p-4 text-accent lg:p-0">
          <CalendarCogIcon className="h-10 w-10 lg:h-16 lg:w-16" />
          <div className="space-y-0 lg:space-y-1">
            <p className="text-lg font-bold lg:text-2xl">Shiftly</p>
            <p className="text-xs">Nosso objetivo é facilitar a sua vida!</p>
          </div>
        </div>
      </div>
      <div className="relative flex h-full flex-1 justify-center pt-20 lg:items-center lg:pt-20">
        <Link to="/sign-in">
          <Button
            variant="outline"
            className="absolute right-[35%] top-4 lg:right-10 lg:top-10"
            size="lg"
          >
            Sign in
          </Button>
        </Link>
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className="grid grid-cols-2 h-full max-h-100 w-5/6 gap-4 rounded-2xl border-2 p-8"
        >
          <div className="space-y-1">
            <Label htmlFor="register-username">First name</Label>
            <Input id="register-username" {...register('first_name')} />
            <FormErrorMessage className="text-xs" error={errors.first_name} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="register-username">Last name</Label>
            <Input id="register-username" {...register('last_name')} />
            <FormErrorMessage className="text-xs" error={errors.last_name} />
          </div>
          <div className="space-y-1 col-span-2">
            <Label htmlFor="register-email">Email</Label>
            <Input id="register-email" {...register('email')} />
            <FormErrorMessage className="text-xs" error={errors.email} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="register-password">Password</Label>
            <Input
              type="password"
              id="register-password"
              {...register('password')}
            />
            <FormErrorMessage className="text-xs" error={errors.password} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="register-re-password">Confirm password</Label>
            <Input
              type="password"
              id="register-re-password"
              {...register('re_password')}
            />
            <FormErrorMessage className="text-xs" error={errors.re_password} />
          </div>
          <Button
            disabled={createUserMutation.isPending}
            className="h-10 w-full space-x-2 text-base col-span-2"
          >
            <span className="">Save</span>
            {createUserMutation.isPending && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
