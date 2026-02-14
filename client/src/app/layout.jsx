import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from "@/components/ui/tooltip"
import LayoutWrapper from '../components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: '360 Core Investment - Smart Digital Investment Platform',
    description: 'Earn consistent daily returns with 360 Core Investment. Secure, transparent, and profitable investment solutions with referral rewards.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} min-h-screen flex flex-col bg-[#FDFCFB]`}>
                <AuthProvider>
                    <TooltipProvider>
                        <LayoutWrapper>
                            {children}
                        </LayoutWrapper>
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: 'rgba(11, 17, 32, 0.95)',
                                    color: '#fff',
                                    border: '1px solid rgba(6, 182, 212, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                },
                            }}
                        />
                    </TooltipProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
