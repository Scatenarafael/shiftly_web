import { signIn } from '@/app/api/sign-in';
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

const SignInSchema = zod.object({
  email: zod.string().min(1, 'Type the e-mail.'),
  password: zod.string().min(1, 'Type the password.'),
});

type signInFormData = zod.infer<typeof SignInSchema>;

export function SignIn() {
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: signIn,
    onError: (errors) => {
      if (isAxiosError(errors)) {
        const errorEntries = Object.entries(errors.response?.data);
        for (const [key, value] of errorEntries) {
          toast.error(
            // biome-ignore lint/style/useTemplate: <explanation>
            'Could not log in! ' + capitalizeString(key) + ': ' + value,
          );
        }
      } else {
        // biome-ignore lint/style/useTemplate: <explanation>
        toast.error('Could not log in! Details: ' + errors.message);
      }
    },
    onSuccess: () => {
      toast.success('Successfully signed in');
      navigate('/', { replace: true });
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<signInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSignIn(data: signInFormData) {
    signInMutation.mutate({ data });
  }

  return (
    <div className="flex h-full flex-1 flex-col lg:flex-row">
      <div className="relative flex w-full items-center justify-center bg-radial-[at_20%_75%] from-primary via-primary/80 to-primary/30 dark:from-primary dark:via-primary/90 dark:to-accent lg:w-1/3">
        <div className="absolute left-2 top-4 lg:top-10">
          <ModeToggle />
        </div>
        <div className="flex items-center gap-4 p-4 lg:p-0">
          <CalendarCogIcon className="h-10 w-10 text-accent lg:h-16 lg:w-16" />
          <div className="space-y-0 text-accent lg:space-y-1">
            <p className="text-lg font-bold lg:text-2xl">Shiftly</p>
            <p className="text-xs">Nosso objetivo é facilitar a sua vida!</p>
          </div>
        </div>
      </div>
      <div className="relative flex h-full flex-1 justify-center pt-20 lg:items-center lg:pt-0">
        <Link to="/sign-up">
          <Button
            variant="default"
            className="absolute right-[35%] top-4 lg:right-10 lg:top-10"
            size="lg"
          >
            Register
          </Button>
        </Link>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex justify-between h-full max-h-80 w-5/6 flex-col gap-4 rounded-2xl border-2 p-8"
        >
          <div className="space-y-1">
            <Label htmlFor="sign-in-username">E-mail</Label>
            <Input id="sign-in-username" {...register('email')} />
            <FormErrorMessage error={errors.email} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="sign-in-password">Password</Label>
            <Input
              type="password"
              id="sign-in-password"
              {...register('password')}
            />
            <FormErrorMessage error={errors.password} />
          </div>
          <Button disabled={signInMutation.isPending} className="space-x-2">
            {' '}
            <span className="">Access dashboard</span>{' '}
            {signInMutation.isPending && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
