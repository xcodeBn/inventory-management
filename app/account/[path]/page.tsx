import { AccountView } from '@neondatabase/auth/react';
import { accountViewPaths } from '@neondatabase/auth/react/ui/server';
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;

    return (
        <main className="min-h-screen flex flex-col">
            <header className="p-4">
                <Link href="/" className="text-purple-50 ">
                    ← Go back home
                </Link>
            </header>

            <div className="flex-1">
                <AccountView path={path} />
            </div>
        </main>

    );
}