import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GoogleSignIn } from '@/components/GoogleSignIn';

export const metadata: Metadata = {
  title: 'Google Sign In | SmartLink',
  description: 'Sign in with Google',
};

export default function GoogleSignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container flex flex-1 items-center justify-center py-12">
        <div className="w-full">
          <GoogleSignIn />
          
          <div className="mt-8 p-4 border border-gray-200 rounded-md text-sm">
            <h3 className="font-medium mb-2">Troubleshooting Tips</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Make sure your Google OAuth credentials are correctly configured</li>
              <li>The callback URL should be: <code>http://localhost:3000/api/auth/callback/google</code></li>
              <li>Check that your NEXTAUTH_URL is set to <code>http://localhost:3000</code></li>
              <li>Ensure that environment variables GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct</li>
              <li>Try using an incognito/private browser window</li>
            </ul>
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