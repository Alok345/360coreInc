'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import api from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-hot-toast"
import { RefreshCw, Fingerprint } from "lucide-react"
import Link from "next/link"

export function LoginForm({
    className,
    ...props
}) {
    const [formData, setFormData] = useState({ email: '', password: '' });
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
            const errorMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.msg || (err.response ? 'Authentication Rejection' : 'Server Unreachable - Check Connection');
            toast.error(errorMsg);
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="border-slate-200/60 shadow-premium">
                <CardHeader className="text-center">
                    <div className="mb-4 mx-auto w-12 h-12 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm overflow-hidden">
                        <Fingerprint className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tight">Access Portal</CardTitle>
                    <CardDescription>
                        Enter your credentials to manage your capital.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <FieldGroup className="gap-6">
                            <Field>
                                <FieldLabel htmlFor="email">Professional Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={onChange}
                                    className="bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Security Passkey</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                                    >
                                        Forgot Key?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={onChange}
                                    className="bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
                                />
                            </Field>
                            <div className="pt-2">
                                <Button type="submit" className="w-full h-12 bg-slate-900 hover:bg-black font-bold" disabled={loading}>
                                    {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Verify Identity"}
                                </Button>
                            </div>
                            <FieldDescription className="text-center text-sm font-semibold text-slate-500">
                                New user? <Link href="/register" className="text-slate-900 font-black hover:underline underline-offset-4">Create Account</Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
