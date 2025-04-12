// app/auth/login/page.tsx
import LoginForm from '@/components/auth/LoginForm'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: { callbackUrl?: string }
}) {
    // Check if user is already logged in
    const session = await getServerSession(authOptions)

    // If already logged in, redirect to the callback URL or dashboard
    if (session) {
        return redirect(searchParams.callbackUrl || '/dashboard')
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-gray-50">
            <div className="w-full max-w-md space-y-10 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome back</h1>
                </div>

                <LoginForm callbackUrl={searchParams.callbackUrl} />

                <div className="pt-6 text-center border-t border-gray-200">
                    <p className="text-gray-600 text-lg">
                        Don't have an account?{' '}
                        <a href="/auth/register" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
