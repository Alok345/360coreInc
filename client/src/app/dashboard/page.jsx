'use client';

import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';
import {
    Copy,
    RefreshCw,
    TrendingUp,
    Wallet,
    DollarSign,
    Target,
    ShieldCheck,
    ChevronRight,
    History,
    ArrowUpRight,
    Activity,
    Users,
    ArrowDownLeft,
    ExternalLink,
    Clock,
    CreditCard
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
    const { user, loading, isAuthenticated, refreshUser } = useAuth();
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);
    const [loadingTx, setLoadingTx] = useState(true);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated) {
            loadTransactions();
        }
    }, [isAuthenticated]);

    const loadTransactions = async () => {
        try {
            const res = await api.get('/api/transactions');
            setTransactions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingTx(false);
        }
    };

    const copyReferral = () => {
        if (user?.referralCode) {
            navigator.clipboard.writeText(user.referralCode);
            toast.success('Code copied to registry');
        }
    };

    const handleRefresh = async () => {
        const toastId = toast.loading('Syncing portfolio data...');
        await refreshUser();
        await loadTransactions();
        toast.success('Data Synchronized', { id: toastId });
    }

    const runDailyReturns = async () => {
        const adminKey = prompt('System Authentication Key Required:');
        if (!adminKey) return;

        try {
            const res = await api.post('/api/admin/run-daily-returns', {}, {
                headers: { 'x-admin-key': adminKey }
            });
            toast.success('Global daily returns processed');
            handleRefresh();
        } catch (err) {
            toast.error('Authentication restricted');
        }
    }

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                    <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Accessing Vault...</span>
                </div>
            </div>
        );
    }

    const totalInvested = parseFloat(user.totalInvested || 0);
    const totalEarned = parseFloat(user.totalEarned || 0);
    const dailyReturn = totalInvested * 0.006;
    const remainingCap = parseFloat(user.remainingCap || (totalInvested * 3 - totalEarned));
    const capProgress = Math.min((totalEarned / (totalInvested * 3 || 1)) * 100, 100);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in sm:py-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                        Member Dashboard
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Portfolio Overview
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
                        title="Re-sync Ledger"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => router.push('/deposit')}
                        className="s-button-primary shadow-sm hover:shadow-md h-11 px-6 text-sm"
                    >
                        Secure Deposit <ArrowUpRight className="w-4 h-4 ml-1" />
                    </button>
                    {user.email === 'admin@example.com' && (
                        <button
                            onClick={runDailyReturns}
                            className="h-11 px-6 rounded-lg bg-orange-50 text-orange-600 font-bold text-sm border border-orange-100 hover:bg-orange-100 transition-all"
                        >
                            Run Returns
                        </button>
                    )}
                </div>
            </div>

            {/* Core Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {/* Total Invested */}
                <div className="s-card p-6 min-h-[140px] flex flex-col justify-between group hover:border-slate-300 transition-all">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Capital</span>
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                            <Wallet className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${totalInvested.toLocaleString()}</span>
                        <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-tighter">
                            <Activity className="w-3 h-3" /> Growth Active
                        </div>
                    </div>
                </div>

                {/* Total Earned */}
                <div className="s-card p-6 min-h-[140px] flex flex-col justify-between group hover:border-slate-300 transition-all">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Revenue</span>
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
                            <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${totalEarned.toLocaleString()}</span>
                            <span className="text-xs font-bold text-slate-400">USD</span>
                        </div>
                        <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-900 transition-all duration-1000" style={{ width: `${capProgress}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Daily Profit */}
                <div className="s-card p-6 min-h-[140px] flex flex-col justify-between group hover:border-slate-300 transition-all">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Expected Daily</span>
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                            <Clock className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${dailyReturn.toFixed(2)}</span>
                        <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fixed Rate: 0.6%</p>
                    </div>
                </div>

                {/* Remaining Cap */}
                <div className="s-card p-6 min-h-[140px] flex flex-col justify-between group hover:border-slate-300 transition-all">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Unrealized Cap</span>
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                            <Target className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${remainingCap.toLocaleString()}</span>
                        <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Limit Reached: {capProgress.toFixed(1)}%</p>
                    </div>
                </div>
            </div>

            {/* Bottom Layout: Transactions & Referral */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                {/* Transaction Ledger (Left 2 Columns on Desktop) */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="s-card bg-white">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <History className="w-5 h-5 text-slate-400" />
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Transaction Registry</h3>
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-full">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secured</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Event</th>
                                        <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume (USD)</th>
                                        <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                        <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:table-cell">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loadingTx ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                                                <div className="flex flex-col items-center gap-2">
                                                    <RefreshCw className="w-6 h-6 animate-spin text-blue-500 opacity-50" />
                                                    <span className="text-[10px] font-bold uppercase">Decrypting Ledger</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-20 text-center text-slate-500 font-bold italic">
                                                No activity detected in recent cycles
                                            </td>
                                        </tr>
                                    ) : (
                                        transactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-5">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest 
                                                        ${tx.type === 'DEPOSIT' ? 'bg-emerald-50 text-emerald-600' :
                                                            tx.type === 'DAILY_RETURN' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                                        {tx.type.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-bold text-slate-900">${parseFloat(tx.amount).toFixed(2)}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-xs text-slate-600 font-medium">{new Date(tx.createdAt).toLocaleDateString()}</div>
                                                    <div className="text-[10px] text-slate-400">{new Date(tx.createdAt).toLocaleTimeString()}</div>
                                                </td>
                                                <td className="px-6 py-5 hidden sm:table-cell">
                                                    <span className="text-xs text-slate-400 italic line-clamp-1">{tx.description}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Referral & Support (1 Column on Desktop) */}
                <div className="space-y-6">
                    {/* Referral Component */}
                    <div className="s-card bg-slate-900 p-8 relative overflow-hidden text-white border-none shadow-xl">
                        <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <h3 className="text-lg font-black tracking-tight mb-2">Referral Rewards</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-8">Invite partners to earn <span className="text-white font-bold">5% instant revenue</span> on their first two investments.</p>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Personal Referral ID</span>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-mono font-black text-blue-400 uppercase tracking-widest">{user.referralCode}</span>
                                <button onClick={copyReferral} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-3 bg-white text-slate-900 font-black rounded-lg hover:bg-slate-100 transition-all text-sm uppercase tracking-widest">
                            Invite Partners
                        </button>
                    </div>

                    {/* Support & Docs Card */}
                    <div className="s-card p-6 bg-white space-y-4">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Help & Regulatory</h4>
                        <div className="space-y-2">
                            <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Platform Whitepaper</span>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </a>
                            <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Secure Support Desk</span>
                                <ShieldCheck className="w-4 h-4 text-slate-400" />
                            </a>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                        <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                            <CreditCard className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Certified Ledger</span>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">Financial data processed via AES-256 secure network</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
