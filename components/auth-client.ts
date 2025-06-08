'use client';

import { signIn } from 'next-auth/react';

/**
 * Sign in with a social provider (Google, LinkedIn, etc.)
 */
export async function signInWithProvider(provider: string, options?: { callbackUrl?: string }) {
  try {
    await signIn(provider, { 
      callbackUrl: options?.callbackUrl || '/dashboard',
      redirect: true
    });
    return { success: true };
  } catch (error) {
    console.error(`Error signing in with ${provider}:`, error);
    return { 
      success: false,
      error: `Failed to sign in with ${provider}`
    };
  }
}

/**
 * Sign in with email and password credentials
 */
export async function signInWithCredentials(email: string, password: string, options?: { callbackUrl?: string }) {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: options?.callbackUrl || '/dashboard'
    });

    if (!result?.ok) {
      return { 
        success: false, 
        error: result?.error || 'Failed to sign in with credentials'
      };
    }

    return { success: true, url: result.url };
  } catch (error) {
    console.error('Error signing in with credentials:', error);
    return { 
      success: false, 
      error: 'An unexpected error occurred'
    };
  }
} 