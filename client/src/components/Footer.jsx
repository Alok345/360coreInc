'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Mail, ArrowUp, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-50 border-t border-slate-200 mt-24">
           
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all hover:scale-110 z-50 animate-fade-in"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center text-white">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">360 Core</span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            Smart digital investment platform built for consistent growth and long-term sustainability.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Platform</h3>
                        <ul className="space-y-3">
                            <li><Link href="/dashboard" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Dashboard</Link></li>
                            <li><Link href="/deposit" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Deposit Funds</Link></li>
                            <li><Link href="/register" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Create Account</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Investment Guide</a></li>
                            <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Risk Disclosure</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400 lowercase">
                        &copy; 2026 360 CORE.
                    </p>
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;
