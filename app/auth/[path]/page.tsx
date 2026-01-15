import { AuthView } from '@neondatabase/auth/react';
import Link from "next/link";

export const dynamicParams = false;

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;

    return (
        <div className="bg-linear-60 from-purple-50 to-purple-100 min-h-screen w-full">
        <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6 ">
            <AuthView path={path} />
            <Link href="/" className="text-black hover:underline">Go back to home</Link>
        </main>
        </div>

    );
}