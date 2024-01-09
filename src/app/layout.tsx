import './globals.css'
import type { Metadata } from 'next'
import { cookies } from "next/headers";
import { Montserrat } from 'next/font/google'
import Providers from './providers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Header from '@/components/commons/Header';
import SignInClientComponent from '@/components/commons/SignIn';
import { Toaster } from '@/components/ui/toaster';
import BottomTab from '@/components/commons/BottomTab/BottomTab';
import Container from '@/components/commons/Container/Container';
import Head from 'next/head';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data : { session }} = await supabase.auth.getSession()

  return (
    <html lang="kr">
      <Head>
        <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
      </Head>
      <body className={montserrat.className}>
        <Providers>
        {session ? (
            <>
              <main className='relative max-w-[600px] mx-auto pb-[78px]'>
                <Header />
                <Container>
                  {children}
                </Container>
                <BottomTab />
              </main>
              <Toaster />
            </>
          ) : (
            <SignInClientComponent />
          )}
        </Providers>
      </body>
    </html>
  )
}
