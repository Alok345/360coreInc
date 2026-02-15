'use client';

import { useState } from 'react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, UserCheck, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        referralCode: '',
    });
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { name, email, password, referralCode } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/api/auth/register', { name, email, password, referralCode });
            login(res.data.token, res.data.user);
            toast.success('Account Activated');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Registration Rejected');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center bg-[#FDFCFB]">
            <div className="w-full max-w-lg animate-fade-in">
                <div className="text-center mb-10">
                    
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
                </div>

                <div className="s-card bg-white p-6 sm:p-10">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="s-input-group">
                            <label className="s-label">
                                <User className="s-label-icon" />
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="s-input"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="s-input-group">
                            <label className="s-label">
                                <Mail className="s-label-icon" />
                                 Email
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="s-input-group">
                                <label className="s-label">
                                    <Lock className="s-label-icon" />
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="s-input"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="s-input-group">
                                <label className="s-label">
                                    <UserCheck className="s-label-icon" />
                                    Referral ID
                                </label>
                                <input
                                    name="referralCode"
                                    type="text"
                                    required
                                    className="s-input text-blue-600 uppercase tracking-widest"
                                    value={referralCode}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="s-button-primary w-full h-14 group shadow-xl shadow-slate-200/50"
                            >
                                {loading ? (
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Register
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm font-semibold text-slate-500">
                            Already a member?{' '}
                            <Link href="/login" className="text-slate-900 font-black hover:underline underline-offset-4">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>

                
            </div>
        </div>
    );
}
