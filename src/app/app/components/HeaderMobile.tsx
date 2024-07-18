"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Mountain } from "lucide-react";
import Dashboard from "../page";
import ThemeSwitch from "@/components/ThemeSwitch";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function HeaderMobile() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const router = useRouter();
    const { signOut } = useContext(AuthContext)

    async function handleSignOut() {
        signOut()
    }

    function navigateLink(route: string) {
        setIsCollapsed(false)
        router.push(route);
    }


    return (
        <>
            <div className="flex w-full h-14 items-center justify-between border-b px-4 bg-bg-tertiary ">
                <Link href="#" className="flex items-center gap-4" prefetch={false}>
                    <Mountain className="h-6 w-6" />
                    <span className="text-lg font-semibold text-text-primary">mPlaces Admin</span>
                </Link>
                <ThemeSwitch />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`rounded-full transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                >
                    <ChevronDown className="h-5 w-5" />
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
            </div>
            {isCollapsed &&
                <>
                    <div className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-t border-fg-primary" onClick={() => navigateLink("/app")}>
                        <span className="text-text-primary">Dashboard</span>
                    </div>

                    <div className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-t border-fg-primary" onClick={() => navigateLink("/app/sales")}>
                        <span className="text-text-primary">Vendas</span>
                    </div>

                    <div className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-t border-fg-primary" onClick={() => navigateLink("/app/products")}>
                        <span className="text-text-primary">Produtos</span>
                    </div>

                    <div className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-t border-fg-primary" onClick={() => navigateLink("/app/reports")}>
                        <span className="text-text-primary">Relatórios</span>
                    </div>

                    <div className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-t border-fg-primary" onClick={() => navigateLink("/app/settings")}>
                        <span className="text-text-primary">Configurações</span>
                    </div>

                    <div className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-t border-fg-primary" onClick={() => navigateLink("/app/profile")}>
                        <span className="text-text-primary">Perfil</span>
                    </div>

                    <button className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-y border-fg-primary" onClick={handleSignOut}>
                        <div className="flex w-full h-10 justify-center items-center py-2 bg-bg-tertiary hover:bg-bg-secondary border-y border-fg-primary">
                            <span className="text-text-primary">Sair</span>
                        </div>
                    </button>
                </>
            }
        </>
    )
}

