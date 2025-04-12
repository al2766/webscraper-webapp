import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Web Scraper Tool',
  description: 'A simple web scraping tool',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}