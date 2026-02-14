import { LoginForm } from "@/components/login-form"
import { Shield } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#FDFCFB]">
            <div className="w-full max-w-sm animate-fade-in">
                <LoginForm />
                <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Shield className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">ENCRYPTED SESSION</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
