'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use direct NextAuth signIn function with the 'google' provider
      // This is the simplest and most direct way to authenticate with Google
      await signIn('google', { callbackUrl: '/dashboard' });
      
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('An error occurred during Google sign-in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Simple Google Sign In</h1>
        <p className="text-gray-500">Click the button below to sign in with Google</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="h-5 w-5" />
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </Button>
      
      <div className="text-center text-sm text-gray-500">
        This is a simplified Google sign-in component for testing purposes.
      </div>
    </div>
  );
} 