import './globals.css';

export const metadata = {
  title: 'Web Scraper Tool',
  description: 'A simple web scraping tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}