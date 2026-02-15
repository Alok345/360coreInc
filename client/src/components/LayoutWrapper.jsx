'use client'

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/deposit');
    const isAuthPage = pathname === '/login' || pathname === '/register';
    const hideGlobalNav = isDashboard || isAuthPage;

    return (
        <>
            {!hideGlobalNav && <Navbar />}
            <main className={`flex-1 ${!hideGlobalNav ? 'pt-20' : ''}`}>
                {children}
            </main>
            {!hideGlobalNav && <Footer />}
        </>
    );
}
