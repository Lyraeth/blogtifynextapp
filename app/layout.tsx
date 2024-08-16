'use client';

import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar />
            {children}
            <Footer />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
