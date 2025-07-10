import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Environment Debug | SmartLink',
  description: 'Debug environment variables',
};

export default function DebugEnvPage() {
  // Only show in development or if explicitly enabled
  const isDebugEnabled = process.env.NODE_ENV === 'development' || process.env.ENABLE_DEBUG === 'true';
  
  if (!isDebugEnabled) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-red-600">Debug page disabled</h1>
        <p>Set ENABLE_DEBUG=true to view this page in production.</p>
      </div>
    );
  }

  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set',
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID ? 'Set' : 'Not Set',
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET ? 'Set' : 'Not Set',
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not Set',
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="bg-gray-100 p-4 rounded">
        <pre className="text-sm">{JSON.stringify(envVars, null, 2)}</pre>
      </div>
      
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Expected Callback URLs:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Google: {process.env.NEXTAUTH_URL}/api/auth/callback/google</li>
          <li>LinkedIn: {process.env.NEXTAUTH_URL}/api/auth/callback/linkedin</li>
        </ul>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <p className="text-sm">
          <strong>Important:</strong> Make sure these callback URLs are configured in your OAuth providers (Google Cloud Console and LinkedIn Developers).
        </p>
      </div>
    </div>
  );
} 