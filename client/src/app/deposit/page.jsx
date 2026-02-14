'use client';

import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
    Landmark,
    ArrowLeft,
    ArrowUpCircle,
    ShieldCheck,
    DollarSign,
    CreditCard,
    Zap,
    TrendingUp,
    RefreshCw,
    Lock
} from 'lucide-react';

export default function Deposit() {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, loading: authLoading, isAuthenticated, refreshUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = parseFloat(amount);
        if (val < 100) {
            toast.error('Minimum requirement: $100');
            return;
        }

        setLoading(true);
        try {
            await api.post('/api/transactions/deposit', { amount: val });
            toast.success('Funds Provisioned');
            setAmount('');
            await refreshUser();
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || 'System Rejection');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
            <RefreshCw className="w-8 h-8 text-slate-200 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen pt-12 sm:pt-24 pb-24 px-4 bg-[#FDFCFB]">
            <div className="max-w-2xl mx-auto animate-fade-in">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-black uppercase tracking-widest text-[10px]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Online</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="s-card bg-white p-8 sm:p-12">
                    <div className="text-center mb-10">
                        <div className="mb-6 mx-auto w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                            <Landmark className="h-7 w-7" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Increase Capital</h1>
                        <p className="text-slate-500 font-medium mt-2">Inject principal into the high-yield registry.</p>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Fixed Yield</span>
                            <span className="text-sm font-bold text-slate-900">0.6% / Day</span>
                        </div>
                        <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Earning Cap</span>
                            <span className="text-sm font-bold text-slate-900">300% Limit</span>
                        </div>
                    </div>

                    {/* Interactive Input */}
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="s-input-group">
                            <label className="s-label px-1">
                                <DollarSign className="s-label-icon" />
                                Provisioning Amount (USD)
                            </label>
                            <div className="relative group">
                                <input
                                    type="number"
                                    required
                                    min="100"
                                    step="0.01"
                                    className="w-full bg-slate-50/30 border-2 border-slate-100 rounded-3xl py-12 px-6 text-5xl sm:text-6xl font-black text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-center focus:ring-8 focus:ring-blue-500/5 placeholder:text-slate-100"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                {(!amount || amount === '0') && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                        <span className="text-6xl font-black text-slate-200">$0.00</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <Lock className="w-3 h-3 text-slate-300" />
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Min entry $100.00 — AES-256 SECURED</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !amount}
                            className="s-button-primary w-full h-16 text-base"
                        >
                            {loading ? (
                                <RefreshCw className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Verify & Provision Capital
                                    <ArrowUpCircle className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-8 opacity-40">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Verified Node</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Direct Settlement</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
