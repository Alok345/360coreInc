'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import {
    Copy,
    RefreshCw,
    TrendingUp,
    Wallet,
    Target,
    ShieldCheck,
    History,
    ArrowUpRight,
    Activity,
    Clock,
    CreditCard
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

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
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-8 h-8 text-slate-200 animate-spin" />
                    <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Accessing Vault...</span>
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
                                <BreadcrumbPage className="text-[10px] font-black uppercase tracking-widest text-slate-900">Portfolio Overview</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="ml-auto flex items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-400"
                            title="Re-sync"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => router.push('/deposit')}
                            className="h-10 px-6 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all inline-flex items-center gap-2"
                        >
                            Secure Deposit <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                <div className="p-6 sm:p-10 animate-fade-in space-y-10 max-w-[1600px] mx-auto w-full">
                    {/* Hero Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Invested */}
                        <div className="s-card p-6 flex flex-col justify-between group">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Capital</span>
                                <div className="p-2 bg-slate-50 rounded-xl">
                                    <Wallet className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-3xl font-black text-slate-900 tracking-tight">${totalInvested.toLocaleString()}</span>
                                <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-tighter">
                                    <Activity className="w-3 h-3" /> Growth Active
                                </div>
                            </div>
                        </div>

                        {/* Total Earned */}
                        <div className="s-card p-6 flex flex-col justify-between group">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</span>
                                <div className="p-2 bg-slate-50 rounded-xl">
                                    <TrendingUp className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-3xl font-black text-slate-900 tracking-tight">${totalEarned.toLocaleString()}</span>
                                <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-900 transition-all duration-1000" style={{ width: `${capProgress}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Daily Profit */}
                        <div className="s-card p-6 flex flex-col justify-between group">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Daily</span>
                                <div className="p-2 bg-slate-50 rounded-xl">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-3xl font-black text-slate-900 tracking-tight">${dailyReturn.toFixed(2)}</span>
                                <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fixed Rate: 0.6%</p>
                            </div>
                        </div>

                        {/* Remaining Cap */}
                        <div className="s-card p-6 flex flex-col justify-between group">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unrealized Cap</span>
                                <div className="p-2 bg-slate-50 rounded-xl">
                                    <Target className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-3xl font-black text-slate-900 tracking-tight">${remainingCap.toLocaleString()}</span>
                                <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Limit Reached: {capProgress.toFixed(1)}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 space-y-6">
                            <div id="ledger" className="s-card bg-white transition-all hover:border-slate-300">
                                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <History className="w-5 h-5 text-slate-400" />
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Transaction Registry</h3>
                                    </div>
                                    {user.email === 'admin@gmail.com' && (
                                        <button onClick={runDailyReturns} className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 transition-all uppercase tracking-widest">Run Batch</button>
                                    )}
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Event</th>
                                                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Volume</th>
                                                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {loadingTx ? (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-20 text-center">
                                                        <RefreshCw className="w-6 h-6 animate-spin text-slate-200 mx-auto" />
                                                    </td>
                                                </tr>
                                            ) : transactions.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-20 text-center text-slate-400 italic text-sm font-medium">No system activity detected</td>
                                                </tr>
                                            ) : (
                                                transactions.map((tx) => (
                                                    <tr key={tx.id} className="hover:bg-slate-50/30 transition-colors">
                                                        <td className="px-6 py-6">
                                                            <div className="flex flex-col gap-1">
                                                                <span className={`w-fit px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest 
                                                                    ${tx.type === 'DEPOSIT' ? 'bg-emerald-50 text-emerald-600' :
                                                                        tx.type === 'DAILY_RETURN' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                                                    {tx.type.replace('_', ' ')}
                                                                </span>
                                                                <span className="text-[10px] text-slate-400 font-medium">{tx.description}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-6">
                                                            <span className="text-sm font-black text-slate-900">${parseFloat(tx.amount).toFixed(2)}</span>
                                                        </td>
                                                        <td className="px-6 py-6">
                                                            <div className="text-xs text-slate-600 font-bold">{new Date(tx.createdAt).toLocaleDateString()}</div>
                                                            <div className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">{new Date(tx.createdAt).toLocaleTimeString()}</div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Referral Sidebar Block */}
                            <div id="referral" className="s-card bg-slate-900 p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                                <h3 className="text-xl font-black tracking-tight mb-2">Referral Rewards</h3>
                                <p className="text-xs text-slate-400 leading-relaxed mb-8">Invite partners to earn <span className="text-white font-bold">5% instant revenue</span> on their capital.</p>

                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Referral Registry ID</span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-mono font-black text-blue-400 uppercase tracking-widest">{user.referralCode}</span>
                                        <button onClick={copyReferral} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                            <Copy className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Section */}
                            <div className="s-card p-6 bg-white space-y-6">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Protocol</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
                                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-900">Institutional Ledger</span>
                                            <span className="text-[10px] font-bold text-slate-400">ISO 27001 Verified</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
                                        <CreditCard className="w-5 h-5 text-indigo-600" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-900">Direct Settlement</span>
                                            <span className="text-[10px] font-bold text-slate-400">T+0 Liquidity</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
