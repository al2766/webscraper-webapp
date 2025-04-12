// app/(authenticated)/layout.tsx
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const AuthenticatedLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className="bg-gray-100 text-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
        </div>
    )
}

export default AuthenticatedLayout;
