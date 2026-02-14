import Link from 'next/link';
import { ArrowRight, Zap, Shield, Users, BarChart3, ChevronRight, CheckCircle2, Globe, TrendingUp, Sparkles, Plus } from 'lucide-react';

export default function Home() {
    return (
        <div className="relative isolate bg-[#FAFAF9]">
            {/* Hero Section */}
            <div className="relative pt-12 sm:pt-24 pb-32 overflow-hidden px-4">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl -z-10 h-full">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-100/50 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8 sm:mb-10">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Protocol Version 4.0 Active</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                        Institutional-Grade <br />
                        <span className="text-blue-600">Investment Portal.</span>
                    </h1>

                    <p className="text-base sm:text-sidebar-text-main text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Precision-engineered for sustainable digital asset growth. Join a network of verified investors earning consistent 0.6% daily returns with institutional security.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/register" className="s-button-primary w-full sm:w-auto px-10 py-4 text-base shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 group">
                            Create Portfolio
                            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                        </Link>
                        <Link href="/login" className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-bold rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-base shadow-sm">
                            Access Identity
                        </Link>
                    </div>

                    {/* Quick Stats Banner */}
                    <div className="mt-20 flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-60">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-slate-900">0.6%</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Daily ROI</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-slate-900">300%</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Growth Cap</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-slate-900">5%</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Referral Bonus</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                        <div className="space-y-6 group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">High-Velocity Growth</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Our core protocol ensures your daily 0.6% return is distributed every 24 hours without system delays.
                            </p>
                        </div>

                        <div className="space-y-6 group">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Collaborative Network</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Build your referral network and earn 5% instant liquid bonuses for every direct verified associate.
                            </p>
                        </div>

                        <div className="space-y-6 group">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Sustainable Stability</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Our 3x capital ceiling ensures the long-term viability of the ecosystem while protecting principal investments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Preview Section */}
            <div className="py-24 sm:py-32 relative overflow-hidden px-4">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up">
                            <div className="h-1 w-12 bg-blue-600 mb-6"></div>
                            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                High-Precision <br />
                                Monitoring Tools.
                            </h2>
                            <p className="text-lg text-slate-600 mb-10 font-medium">
                                Every transaction is recorded on our transparent ledger. Monitor your portfolio's performance in real-time from any device worldwide.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { label: 'Verified Partners', value: 'Instant ROI' },
                                    { label: 'Legacy Data', value: 'Encrypted' },
                                    { label: 'Uptime', value: '99.99%' },
                                    { label: 'Withdrawals', value: 'Scheduled' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col border-l-2 border-slate-100 pl-4 py-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-lg font-bold text-slate-800">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Preview */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] -z-10"></div>
                            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-slate-100">
                                <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 p-8 space-y-6 min-h-[400px]">
                                    <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                        </div>
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Portfolio.json</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                                            <div className="h-2 w-1/3 bg-slate-100 rounded-full"></div>
                                            <div className="h-4 w-2/3 bg-blue-500/20 rounded-full"></div>
                                        </div>
                                        <div className="h-24 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                                            <div className="h-2 w-1/3 bg-slate-100 rounded-full"></div>
                                            <div className="h-4 w-2/3 bg-slate-200 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="h-48 bg-white border border-slate-200 rounded-2xl flex flex-col p-6 items-center justify-center gap-4">
                                        <div className="w-16 h-1 bg-slate-100 rounded-full"></div>
                                        <div className="w-full h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                                            <div className="w-[60%] h-full bg-blue-600"></div>
                                        </div>
                                        <div className="w-24 h-4 bg-slate-100 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA Block */}
            <div className="py-24 sm:py-32 px-4">
                <div className="max-w-4xl mx-auto s-card bg-slate-900 p-12 sm:p-24 text-center text-white border-none shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
                    <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-8 animate-float" />
                    <h2 className="text-3xl sm:text-5xl font-black mb-8 leading-tight">Begin Your Investment <br /> Journey Today.</h2>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto mb-12 font-medium">
                        Setup takes less than 3 minutes. Secure your position in the next generational investment cycle.
                    </p>
                    <Link href="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-900 font-black rounded-lg hover:bg-slate-100 transition-all text-sm uppercase tracking-widest group">
                        Enter Registry
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
