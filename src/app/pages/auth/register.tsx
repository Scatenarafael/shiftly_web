import { registerUser } from '@/app/api/sign-up';
import { FormErrorMessage } from '@/components/form-error-message';
import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { capitalizeString, phoneMask } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Dam, Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import * as zod from 'zod';

const CreateUserSchema = zod
  .object({
    username: zod.string().min(1, 'Type username.'),
    email: zod.string().min(1, 'Type e-mail.').email(),
    phone: zod.string(),
    password: zod.string(),
    re_password: zod.string(),
    role: zod.number().nullish(),
    notes: zod.string(),
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
    control,
    reset,
  } = useForm<createUserFormData>({
    resolver: zodResolver(CreateUserSchema),
    values: {
      email: '',
      username: '',
      phone: '',
      password: '',
      re_password: '',
      notes: '',
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
      <div className="relative flex w-full items-center justify-center bg-gradient-to-r from-foreground to-primary/70 dark:from-primary/70 dark:to-foreground lg:w-1/2">
        <div className="absolute left-2 top-4 lg:top-10">
          <ModeToggle />
        </div>
        <div className="flex items-center gap-4 p-4 text-accent lg:p-0">
          <Dam className="h-10 w-10 lg:h-16 lg:w-16" />
          <div className="space-y-0 lg:space-y-1">
            <p className="text-lg font-bold lg:text-3xl">PhotonDam</p>
            <p className="text-xs">Monitoring is our job!</p>
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
          className="grid grid-cols-2 h-full max-h-[25rem] w-5/6 gap-4 rounded-lg border-2 p-8"
        >
          <div className="space-y-1">
            <Label htmlFor="register-username">Username</Label>
            <Input id="register-username" {...register('username')} />
            <FormErrorMessage className="text-xs" error={errors.username} />
          </div>
          <div className="space-y-1 w-full">
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="w-full space-y-1">
                    <Label htmlFor="create-user-phone" className="text-sm">
                      Phone
                    </Label>
                    <Input
                      id="create-user-phone"
                      className="text-sm"
                      value={value}
                      onChange={(e) => {
                        onChange(phoneMask(e.target.value));
                      }}
                    />
                    <FormErrorMessage
                      className="text-xs"
                      error={errors.phone}
                    />
                  </div>
                );
              }}
            />
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
