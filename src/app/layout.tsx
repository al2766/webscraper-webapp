// app/layout.tsx
import { Providers } from './providers'
import Navigation from '@/components/layout/Navigation'
import './globals.css'

export const metadata = {
  title: 'Your App',
  description: 'Your app description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow bg-gray-100">
              {children}
            </main>
            <footer className="bg-gray-50 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500 text-sm">
                  © {new Date().getFullYear()} Your Company
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
