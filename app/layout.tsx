'use client';

import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <main className="flex min-h-screen flex-col items-center justify-between p-20">
            <Navbar />
            {children}
            <Footer />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
