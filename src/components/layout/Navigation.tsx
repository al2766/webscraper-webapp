'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import UserMenu from './UserMenu'

export default function Navigation() {
    const { data: session, status } = useSession()

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-gray-800 font-mono">{"<Scripter />"}</span>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {status === 'authenticated' && (
                            <UserMenu />
                        )
                            // : status === 'loading' ? (
                            //     <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                            // ) : (
                            //     <Link href="/auth/login" className="text-sm text-indigo-600 hover:text-indigo-800">
                            //         Register or Login
                            //     </Link>
                            // )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}
