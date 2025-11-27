import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/ThemeProvider";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'KidBookBuilder - Where Young Storytellers Build Their First Business Adventure',
  description: 'The magical digital studio where young writers transform their stories into successful businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn(
        montserrat.variable,
        "font-sans antialiased min-h-screen bg-magic-white text-night-sky"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}