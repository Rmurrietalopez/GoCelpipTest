import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Go CELPIP',
  description: 'Practice CELPIP mock exams',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Go CELPIP</title>
        <meta name="description" content="Practice CELPIP mock exams" />
      </Head>
      <html lang="en" data-theme="goCELPIP">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <header className="py-2 shadow bg-base-100">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
              <Image
                src="/assets/logo.png"
                alt="Go CELPIP logo"
                width={120} // smaller width
                height={32}
                priority
              />
            </div>
          </header>

          <main className="flex-grow">{children}</main>

          <footer className="p-4 text-center text-sm text-base-content bg-base-100">
            &copy; {new Date().getFullYear()} Go CELPIP
          </footer>
        </body>
      </html>
    </>
  );
}










