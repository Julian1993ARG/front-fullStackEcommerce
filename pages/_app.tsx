import { AppProps } from 'next/app';
import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';

export default function App ({ Component, pageProps }: AppProps) {
  return (

    <>
      <Head>
        <title>Next.js + Tailwind CSS</title>
      </Head>
      <main>
        <Component />
      </main>
    </>
  );
}
