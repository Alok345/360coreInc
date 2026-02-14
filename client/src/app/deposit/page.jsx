'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
    Landmark,
    ArrowLeft,
    ArrowUpCircle,
    ShieldCheck,
    DollarSign,
    CreditCard,
    RefreshCw,
    Lock
} from 'lucide-react';
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Deposit() {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const { loading: authLoading, isAuthenticated, refreshUser } = useAuth();
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
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#FDFCFB]">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-6 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Management</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-[10px] font-black uppercase tracking-widest text-slate-900">Provision Capital</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <div className="p-6 sm:p-10 animate-fade-in flex flex-col items-center">
                    <div className="max-w-2xl w-full">
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-8 px-2">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-black uppercase tracking-widest text-[10px]"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Portfolio Overview
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Active</span>
                            </div>
                        </div>

                        {/* Main Card */}
                        <div className="s-card bg-white p-8 sm:p-12 border-slate-200 shadow-xl">
                            <div className="text-center mb-12">
                                <div className="mb-6 mx-auto w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                    <Landmark className="h-8 w-8" />
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Provision Capital</h1>
                                <p className="text-slate-500 font-medium mt-2">Increase your investment volume in the registry.</p>
                            </div>

                            {/* Quick Info Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Fixed Rate</span>
                                    <span className="text-base font-bold text-slate-900">0.6% / Day</span>
                                </div>
                                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Growth Cap</span>
                                    <span className="text-base font-bold text-slate-900">300% Multiplier</span>
                                </div>
                            </div>

                            {/* Interactive Input */}
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="s-input-group">
                                    <label className="s-label px-1">
                                        <DollarSign className="s-label-icon" />
                                        Investment Amount (USD)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            required
                                            min="100"
                                            step="0.01"
                                            className="w-full bg-white border-2 border-slate-300 rounded-2xl py-12 px-6 text-5xl sm:text-6xl font-black text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 transition-all text-center placeholder:text-slate-100"
                                            placeholder="100.00"
                                            value={amount}
                                            onChange={(e) => setAmount(amount === '0' ? e.target.value.replace(/^0+/, '') : e.target.value)}
                                        />
                                        {(!amount || amount === '0') && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="text-6xl font-black text-slate-100 opacity-50">$0.00</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mt-6">
                                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Min Entry $100.00 — AES-256 SECURED</p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !amount}
                                    className="s-button-primary w-full h-20 text-lg shadow-xl"
                                >
                                    {loading ? (
                                        <RefreshCw className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            Verify & Provision Funds
                                            <ArrowUpCircle className="w-6 h-6 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-14 pt-8 border-t border-slate-100 flex items-center justify-center gap-10 opacity-60">
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck className="h-4.5 w-4.5 text-slate-900" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Verified Ledger</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CreditCard className="h-4.5 w-4.5 text-slate-900" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Direct Deposit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
