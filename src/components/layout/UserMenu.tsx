'use client'

import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import LogoutButton from '@/components/auth/LogoutButton'
import Link from 'next/link'
import Image from 'next/image'

export default function UserMenu() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(menuRef, () => setIsOpen(false))

    if (!session?.user) return null

    const { name, email, image } = session.user
    const displayName = name || email?.split('@')[0] || 'User'

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-expanded={isOpen}
            >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={displayName}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                        />
                    ) : (
                        <span className="text-sm font-medium text-gray-700">
                            {displayName.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
                <span className="ml-2 hidden md:block text-gray-400">{displayName}</span>
                <svg className="ml-1 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 divide-y divide-gray-100">
                        <div className="px-4 py-3">
                            <p className="text-sm text-gray-400">Signed in as</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{email}</p>
                        </div>
                        <div className="py-1">
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Profile
                            </Link>
                            <Link
                                href="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Settings
                            </Link>
                        </div>
                        <div className="py-1">
                            <LogoutButton className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
