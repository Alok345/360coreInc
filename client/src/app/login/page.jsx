import { LoginForm } from "@/components/login-form"


export default function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#FDFCFB]">
            <div className="w-full max-w-sm animate-fade-in">
                <LoginForm />
                
            </div>
        </div>
    )
}
