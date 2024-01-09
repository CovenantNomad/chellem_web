'use client'

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import React from 'react';

interface AuthProps {
  session: Session | null
}

const AuthClient = ({ session }: AuthProps) => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ 
      provider: 'kakao',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
      }
     })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh()
  }

  return (
    <div>
      {session ? (
        <button onClick={handleSignOut} className='px-4 py-2 border border-blue-600 text-blue-600 rounded-md'>SignOut</button>
      ) : (
        <button onClick={handleSignIn} className='px-4 py-2 bg-blue-600 text-white rounded-md'>Login</button>
      )}
    </div>
  );
};

export default AuthClient;
