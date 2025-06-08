import { Metadata } from 'next';
import { SmartSignUp } from '@/components/SmartSignUp';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign Up | SmartLink',
  description: 'Create a new SmartLink account',
};

interface SignUpPageProps {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const session = await getServerSession(authOptions);
  
  // Redirect to dashboard if already signed in
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="container flex flex-1 items-center justify-center py-12">
      <div className="w-full max-w-md">
        <SmartSignUp callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
}
