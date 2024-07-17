"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <>
            <aside
                className={`
                    min-h-screen                   
                    flex flex-col 
                    border-r 
                    bg-bg-secondary 
                    transition-all 
                    duration-300 
                    ${isCollapsed ? "w-28" : " w-60  min-w-60"}`}
            >
                <div className="flex h-16 items-center justify-between border-b px-4">
                    {isCollapsed ?
                        <Link href="#" className="flex items-center" prefetch={false}>
                            <MountainIcon className="h-6 w-6" />
                        </Link> :
                        <Link href="#" className="flex items-center gap-4" prefetch={false}>
                            <MountainIcon className="h-6 w-6" />
                            <span className="text-lg font-semibold text-text-primary">mPlaces Admin</span>
                        </Link>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`rounded-full transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>
                </div>

                {/* Menus */}
                <div className="flex-1 overflow-y-auto">
                    <nav className="mt-4 space-y-2 px-4">
                        <div>
                            {/* <div className="mb-2 text-xs font-medium text-muted-foreground border-b broder-bg-secondary w-full"></div> */}
                            <div className="grid gap-1">

                                <Link
                                    href="/app"
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${isCollapsed ? "justify-center" : "hover:text-foreground focus:text-foreground"
                                        }`}
                                    prefetch={false}
                                >
                                    <LayoutDashboardIcon className="h-5 w-5" />
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Dashboard</span>
                                </Link>

                                <Link
                                    href="/app/sales"
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${isCollapsed ? "justify-center" : "hover:text-foreground focus:text-foreground"
                                        }`}
                                    prefetch={false}
                                >
                                    <HomeIcon className="h-5 w-5" />
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Vendas</span>
                                </Link>

                                <Link
                                    href="/app/products"
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${isCollapsed ? "justify-center" : "hover:text-foreground focus:text-foreground"
                                        }`}
                                    prefetch={false}
                                >
                                    <CalendarIcon className="h-5 w-5" />
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Produtos</span>
                                </Link>

                                <Link
                                    href="/app/reports"
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${isCollapsed ? "justify-center" : "hover:text-foreground focus:text-foreground"
                                        }`}
                                    prefetch={false}
                                >
                                    <CalendarIcon className="h-5 w-5" />
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Relatórios</span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs font-medium text-muted-foreground border-b broder-bg-secondary w-full"></div>
                            <div className="mb-2 text-xs font-medium text-muted-foreground"></div>
                            <div className="grid gap-1">
                                <Link
                                    href="/app/settings"
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${isCollapsed ? "justify-center" : "hover:text-foreground focus:text-foreground"
                                        }`}
                                    prefetch={false}
                                >
                                    <SettingsIcon className="h-5 w-5" />
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Configurações</span>
                                </Link>
                                <Link
                                    href="profile"
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${isCollapsed ? "justify-center" : "hover:text-foreground focus:text-foreground"
                                        }`}
                                    prefetch={false}
                                >
                                    <UserIcon className="h-5 w-5" />
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Profile</span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    )
}

function CalendarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>
    )
}


function ChevronLeftIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}


function HomeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function LayoutDashboardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    )
}


function MountainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}


function SettingsIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function UserIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

