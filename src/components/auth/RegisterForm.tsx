// components/auth/RegisterForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function RegisterForm({ callbackUrl = '/dashboard' }: { callbackUrl?: string }) {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            // After successful registration, automatically sign in
            const signInResult = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })


            if (signInResult?.error) {
                throw new Error(signInResult.error || 'Failed to sign in')
            }

            // Redirect to dashboard after successful sign in
            router.push('/dashboard')
            router.refresh()
        } catch (error: any) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
                <div className="bg-red-50 p-4 text-red-800 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        {isLoading ? 'Creating account...' : 'Create account'}
                    </button>
                </div>

                <div className="flex items-center justify-center pt-4">
                    <div className="flex items-center w-full my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm font-medium">Sign Up with</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="mt-6 grid grid-cols-1 gap-3">
                        <button
                            type="button"
                            onClick={() => signIn('google', { callbackUrl })}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
