'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaLinkedin } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export function LinkedInSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLinkedInSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Starting LinkedIn sign-in process...");
      
      // Use the direct signIn method with additional parameters to help debugging
      const result = await signIn('linkedin', { 
        callbackUrl: '/dashboard',
        redirect: false // Don't redirect immediately so we can handle errors
      });
      
      console.log("LinkedIn sign-in result:", result);
      
      if (result?.error) {
        setError(`Authentication error: ${result.error}`);
        setIsLoading(false);
      } else if (result?.url) {
        // If successful with a URL, manually redirect
        window.location.href = result.url;
      }
      
    } catch (error) {
      console.error('LinkedIn sign-in error:', error);
      setError('An error occurred during LinkedIn sign-in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">LinkedIn Sign In</h1>
        <p className="text-gray-500">Click the button below to sign in with LinkedIn</p>
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
        onClick={handleLinkedInSignIn}
      >
        <FaLinkedin className="h-5 w-5 text-blue-700" />
        {isLoading ? 'Signing in...' : 'Sign in with LinkedIn'}
      </Button>
      
      <div className="text-center text-sm text-gray-500">
        This is a simplified LinkedIn sign-in component for testing purposes.
      </div>
    </div>
  );
} 