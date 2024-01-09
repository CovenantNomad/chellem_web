import React from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AuthClient from './AuthClient';

interface AuthServerProps {}

const AuthServer = async ({}: AuthServerProps) => {
  const supabase = createServerComponentClient({ cookies })
  const { data : { session }} = await supabase.auth.getSession()

  return <AuthClient session={session} />
};

export default AuthServer;
