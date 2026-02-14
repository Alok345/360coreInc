'use client'

import * as React from "react"
import {
    LayoutDashboard,
    Wallet,
    History,
    Settings,
    ShieldCheck,
    TrendingUp,
    LogOut,
    Sparkles,
    UserCircle
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    {
        title: "Portfolio",
        items: [
            {
                title: "Overview",
                url: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Provision Capital",
                url: "/deposit",
                icon: Wallet,
            },
        ],
    },
    {
        title: "Registry",
        items: [
            {
                title: "Ledger History",
                url: "/dashboard#ledger",
                icon: History,
            },
            {
                title: "Referral Network",
                url: "/dashboard#referral",
                icon: ShieldCheck,
            },
        ],
    },
]

export function AppSidebar({ ...props }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    return (
        <Sidebar {...props} className="border-r border-slate-200/60 shadow-premium">
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-3">
                    <div className="bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900">360 Core</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-2 pt-4">
                {navItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url} className="px-4 py-6 rounded-xl transition-all">
                                            <Link href={item.url} className="flex items-center gap-3 font-semibold text-slate-600 hover:text-slate-900 active:bg-slate-50">
                                                <item.icon className={`w-5 h-5 ${pathname === item.url ? 'text-blue-600' : 'text-slate-400'}`} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-2 py-3 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <UserCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate">{user?.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tighter">{user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        title="End Session"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
