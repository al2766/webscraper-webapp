// app/page.tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HomePage() {
    // Check if user is already authenticated
    const session = await getServerSession(authOptions)

    // Optional: Redirect authenticated users directly to dashboard
    // If you want authenticated users to still see the landing page, remove this
    if (session) {
        redirect('/dashboard')
    }

    redirect('/auth/login')

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow bg-gray-50">
            </main>

            <footer className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500">
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
