'use client'

import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import LogoutButton from '@/components/auth/LogoutButton'
import Link from 'next/link'

export default function UserMenu() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(menuRef, () => setIsOpen(false))

    if (!session) return null

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            >
                <span>{session.user?.name || session.user?.email}</span>
                <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Your Profile
                        </Link>
                        <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Settings
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <LogoutButton className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" />
                    </div>
                </div>
            )}
        </div>
    )
}
