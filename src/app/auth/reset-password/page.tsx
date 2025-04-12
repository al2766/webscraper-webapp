'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // Redirect if no token
    useEffect(() => {
        if (!token) {
            router.push('/auth/forgot-password')
        }
    }, [token, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setIsSubmitting(false)
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
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

    if (!token) {
        return null // Will redirect in useEffect
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-gray-50">
            <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Reset your password</h1>
                </div>

                {success ? (
                    <div className="space-y-6">
                        <div className="bg-gray-100 p-4 rounded-md text-gray-600">
                            Your password has been successfully reset.
                        </div>
                        <div className="text-center">
                            <Link href="/auth/login" className="text-gray-600 hover:underline">
                                Back to Login
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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your new password"
                                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md text-gray-800"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your new password"
                                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md text-gray-800"
                            />
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isSubmitting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
