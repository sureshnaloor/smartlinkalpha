import { Metadata } from 'next';
import { SmartSignIn } from '@/components/SmartSignIn';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign In | SmartLink',
  description: 'Sign in to your SmartLink account',
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  // If user is already authenticated, redirect to dashboard
  if (session?.user) {
    console.log('User already authenticated, redirecting to dashboard:', session.user.email);
    redirect('/dashboard');
  }

  // Show debugging info in development
  const debugInfo = process.env.NODE_ENV === 'development' ? {
    googleClientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 8) + '...',
    isConfigured: !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.NEXTAUTH_URL + '/api/auth/callback/google',
    session: session ? 'Active' : 'None',
    sessionUser: session?.user ? {
      email: session.user.email,
      name: session.user.name
    } : null,
  } : null;

  return (
    <div className="container flex flex-1 items-center justify-center py-12">
      <div className="w-full max-w-md">
        <SmartSignIn />
        
        {/* Debugging info in development */}
        {debugInfo && (
          <div className="mt-8 p-4 border border-gray-200 rounded-md text-xs text-gray-500">
            <h3 className="font-medium mb-2">Debug Info (Dev Only)</h3>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            <p className="mt-2">
              Make sure your Google OAuth credentials are correctly configured with the callback URL above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 