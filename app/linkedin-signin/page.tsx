import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LinkedInSignIn } from '@/components/LinkedInSignIn';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

export const metadata: Metadata = {
  title: 'LinkedIn Sign In | SmartLink',
  description: 'Sign in with LinkedIn',
};

export default async function LinkedInSignInPage() {
  const session = await getServerSession(authOptions);

  // Show debugging info in development
  const debugInfo = process.env.NODE_ENV === 'development' ? {
    linkedInClientId: process.env.LINKEDIN_CLIENT_ID?.substring(0, 4) + '...',
    isConfigured: !!process.env.LINKEDIN_CLIENT_ID && !!process.env.LINKEDIN_CLIENT_SECRET,
    callbackUrl: process.env.NEXTAUTH_URL + '/api/auth/callback/linkedin',
    session: session ? 'Active' : 'None',
    authProvider: 'linkedin',
    nextAuthVersion: '4.x',
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container flex flex-1 items-center justify-center py-12">
        <div className="w-full">
          <LinkedInSignIn />
          
          <div className="mt-8 p-4 border border-gray-200 rounded-md text-sm">
            <h3 className="font-medium mb-2">LinkedIn OAuth Configuration</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Make sure your LinkedIn OAuth credentials are correctly configured</li>
              <li>The callback URL should be: <code>{process.env.NEXTAUTH_URL}/api/auth/callback/linkedin</code></li>
              <li>Required scopes: <code>openid profile email</code></li>
              <li>LinkedIn app should have OpenID Connect product added</li>
            </ul>
            
            <h3 className="font-medium mt-4 mb-2">Common LinkedIn OAuth Issues</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>If you see an <code>iss value</code> error, that's been fixed in the provider configuration</li>
              <li>Remember that LinkedIn Developers requires you to add test users in dev mode</li>
              <li>Make sure you're using the OpenID Connect scopes, not the older OAuth 2.0 scopes</li>
              <li>Check that your app has the OpenID Connect product properly configured</li>
              <li>Verify the callback URL is <strong>exactly</strong> as shown above, including http:// or https://</li>
            </ul>
            
            {/* Debugging info in development */}
            {debugInfo && (
              <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                <h4 className="font-medium mb-1">Debug Info (Dev Only)</h4>
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-4 border-t">
        <div className="container">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
} 