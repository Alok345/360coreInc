'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Home, LayoutDashboard, Wallet, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center text-white">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">360 Core</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {!isAuthenticated ? (
                            <>
                                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
                                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Login</Link>
                                <Link href="/register" className="s-button-primary scale-90">
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <Link href="/deposit" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
                                    <Wallet className="w-4 h-4" />
                                    Deposit
                                </Link>
                                <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-slate-900">{user.name}</div>
                                        <div className="text-[10px] text-blue-600 font-medium">{user.email}</div>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                                        title="Logout"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden py-4 animate-slide-up bg-white border-t border-slate-100">
                        <div className="space-y-1">
                            {!isAuthenticated ? (
                                <>
                                    <Link href="/" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                                    <Link href="/login" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                                    <div className="p-4">
                                        <Link href="/register" className="s-button-primary w-full" onClick={() => setIsOpen(false)}>Get Started</Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 py-3 mb-2">
                                        <div className="font-bold text-slate-900">{user.name}</div>
                                        <div className="text-xs text-blue-600">{user.email}</div>
                                    </div>
                                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>
                                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                                    </Link>
                                    <Link href="/deposit" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setIsOpen(false)}>
                                        <Wallet className="w-5 h-5" /> Deposit
                                    </Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium mt-2">
                                        <LogOut className="w-5 h-5" /> Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
