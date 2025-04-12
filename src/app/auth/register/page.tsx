// app/auth/register/page.tsx
import RegisterForm from '@/components/auth/RegisterForm'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: { callbackUrl?: string }
}) {
    // Check if user is already logged in
    const session = await getServerSession(authOptions)

    // If already logged in, redirect to dashboard
    if (session) {
        return redirect(searchParams.callbackUrl || '/dashboard')
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-gray-50">
            <div className="w-full max-w-md space-y-10 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-gray-800">Get started</h1>
                </div>

                <RegisterForm callbackUrl={searchParams.callbackUrl} />

                <div className="pt-6 text-center border-t border-gray-200">
                    <p className="text-gray-600 text-lg">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
