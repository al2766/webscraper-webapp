'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            setSuccess(true)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-gray-50">
            <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Reset your password</h1>
                    <p className="text-gray-500">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                {success ? (
                    <div className="space-y-6">
                        <div className="bg-gray-100 p-4 rounded-md text-gray-600">
                            Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                        </div>
                        <div className="text-center">
                            <Link href="/auth/login" className="text-gray-600 hover:underline">
                                Return to login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 p-4 text-red-800 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md text-gray-800"
                            />
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isSubmitting ? 'Sending...' : 'Send reset link'}
                            </button>
                        </div>

                        <div className="text-center">
                            <Link href="/auth/login" className="text-gray-600 hover:underline">
                                Back to login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
