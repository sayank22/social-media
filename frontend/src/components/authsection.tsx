'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../lib/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../lib/ui/card';
import { Input } from '../lib/ui/input';
import { Label } from '../lib/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../lib/ui/tabs';
import { AuthContext } from '../store/AuthContext';
import { login as apiLogin, signup as apiSignup } from '../api/userApi';
import React from 'react';

// Validation patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 20;

export function AuthTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = React.useContext(AuthContext);
  const [activeTab, setActiveTab] = React.useState('account');
  const [loginMessage, setLoginMessage] = React.useState('');

  const loginForm = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (location.state?.showLoginMessage) {
      setLoginMessage('Please login to continue');
      toast.info('🔒 Please login to create a post');
    }
  }, [location]);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await apiLogin(data);
      if (response?.data?.token) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        login(user, token);
        toast.success('✅ Login successful!');
        navigate(location.state?.from || '/', { replace: true });
      }
    } catch (error) {
      toast.error(
        `❌ Login failed: ${error?.response?.data?.message || error?.message}`,
      );
    }
  };

  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await apiSignup(data);
      toast.success('✅ Signup successful! Please login.');
      setActiveTab('account');
      signupForm.reset();
    } catch (error) {
      toast.error(
        `❌ Signup failed: ${error.response?.data?.message || 'Something went wrong'}`,
      );
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-[400px] m-auto"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Signup</TabsTrigger>
      </TabsList>

      {/* Login Tab */}
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Let's Start</CardTitle>
            <CardDescription>
              {loginMessage || 'Access your account to continue to SilentPost'}
            </CardDescription>
          </CardHeader>

          <FormProvider {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder='Enter Your Email'
                    autoComplete="email"
                    aria-invalid={!!loginForm.formState.errors.email}
                    aria-describedby="email-error"
                    {...loginForm.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {loginForm.formState.errors.email && (
                    <p id="email-error" className="text-red-500 text-sm">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder='Enter Your Password'
                    autoComplete="current-password"
                    aria-invalid={!!loginForm.formState.errors.password}
                    aria-describedby="password-error"
                    {...loginForm.register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: PASSWORD_MIN_LENGTH,
                        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
                      },
                      maxLength: {
                        value: PASSWORD_MAX_LENGTH,
                        message: `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters`,
                      },
                    })}
                  />
                  {loginForm.formState.errors.password && (
                    <p id="password-error" className="text-red-500 text-sm">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="bg-black text-white w-full"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </TabsContent>

      {/* Signup Tab */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join our community. Already have an account? Switch to login.
            </CardDescription>
          </CardHeader>

          <FormProvider {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(handleSignup)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder='Enter Your Name'
                    aria-invalid={!!signupForm.formState.errors.name}
                    aria-describedby="name-error"
                    {...signupForm.register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 3,
                        message: 'Name must be at least 3 characters',
                      },
                    })}
                  />
                  {signupForm.formState.errors.name && (
                    <p id="name-error" className="text-red-500 text-sm">
                      {signupForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder='Enter Your Email'
                    autoComplete="email"
                    aria-invalid={!!signupForm.formState.errors.email}
                    aria-describedby="email-error"
                    {...signupForm.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {signupForm.formState.errors.email && (
                    <p id="email-error" className="text-red-500 text-sm">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder='Enter Your Password'
                    autoComplete="new-password"
                    aria-invalid={!!signupForm.formState.errors.password}
                    aria-describedby="password-error"
                    {...signupForm.register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: PASSWORD_MIN_LENGTH,
                        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
                      },
                      maxLength: {
                        value: PASSWORD_MAX_LENGTH,
                        message: `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters`,
                      },
                    })}
                  />
                  {signupForm.formState.errors.password && (
                    <p id="password-error" className="text-red-500 text-sm">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="bg-black text-white w-full"
                  disabled={signupForm.formState.isSubmitting}
                >
                  {signupForm.formState.isSubmitting
                    ? 'Creating account...'
                    : 'Sign Up'}
                </Button>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
