'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateUser } from '@/zmodel/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useSpaceSlug } from '@/lib/context';
import { getSpaceUrl } from '@/lib/urls';

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string(),
});

type UserFormValue = z.infer<typeof formSchema>;

export const userDemo = {
    email: 'demo@demo.fr',
    password: 'demonstration',
};
export function UserAuthForm() {
    const searchParams = useSearchParams();
    const spaceSlug = useSpaceSlug();
    const spaceSlugUrl = getSpaceUrl(spaceSlug);
    const callbackUrl = searchParams.get('callbackUrl') ?? spaceSlugUrl ?? '/';

    const [loading, setLoading] = useState(false);
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
    });

    const signInCredentials = useCallback(
        async ({ email, password }: { email: string; password: string }) => {
            await signIn('credentials', {
                email,
                password,
                callbackUrl,
            });
        },
        [callbackUrl]
    );

    const signup = useCreateUser();
    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        try {
            await signup.mutateAsync({ data });
        } catch {
            // Account exists
        } finally {
            await signInCredentials({ email: data.email, password: data.password });
        }
    };

    useQuery({
        queryKey: ['demoSignIn'],
        queryFn: async () => {
            await onSubmit(userDemo);
        },
        enabled: process.env.NODE_ENV === 'development',
    });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        Continue with email
                    </Button>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">Or continue with</span>
                </div>
            </div>
            <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => signIn('discord', { callbackUrl })}
            >
                Continue with Discord
            </Button>
        </>
    );
}
