'use client';

import { useState } from 'react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Shield, ArrowRight, Fingerprint, Eye, EyeOff, RefreshCw } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/api/auth/login', { email, password });
            login(res.data.token, res.data.user);
            toast.success('Identity Verified');
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            toast.error(err.response?.data?.msg || 'Authentication Rejection');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center bg-[#FDFCFB]">
            <div className="w-full max-w-md animate-fade-in">
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <div className="mb-6 mx-auto w-12 h-12 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm overflow-hidden">
                        <Fingerprint className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Access Portal</h1>
                    <p className="text-slate-500 font-medium mt-2">Enter your credentials to manage your capital.</p>
                </div>

                {/* Login Card */}
                <div className="s-card bg-white p-6 sm:p-10">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="s-input-group">
                            <label className="s-label">
                                <Mail className="s-label-icon" />
                                Professional Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="s-input"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="s-input-group">
                            <label className="s-label">
                                <Lock className="s-label-icon" />
                                Security Passkey
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="s-input pr-12"
                                    value={password}
                                    onChange={onChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pb-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/10" />
                                <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-wider">Keep Logged In</span>
                            </label>
                            <Link href="#" className="text-[11px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Support</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="s-button-primary w-full h-14 group"
                        >
                            {loading ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Verify Identity
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm font-semibold text-slate-500">
                            New user?{' '}
                            <Link href="/register" className="text-slate-900 font-black hover:underline underline-offset-4">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Shield className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">ENCRYPTED SESSION</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
