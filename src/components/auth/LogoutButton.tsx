// components/auth/LogoutButton.tsx
'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'

interface LogoutButtonProps {
    className?: string
    redirectPath?: string
}

export default function LogoutButton({
    className = '',
    redirectPath = '/auth/login'
}: LogoutButtonProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await signOut({ callbackUrl: redirectPath })
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center ${className}`}
            aria-label="Log out"
        >
            {isLoggingOut ? 'Logging out...' : 'Log out'}
        </button>
    )
}
