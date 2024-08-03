"use client"
import ThemeSwitch from "@/components/ThemeSwitch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthContext";
import { BellIcon } from "@heroicons/react/24/outline"
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Header() {
    const { user, signOut } = useContext(AuthContext)
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)
    const router = useRouter()
    const menuRef = useRef<HTMLInputElement>(null);

    function handleOpenAvatarMenu() {
        setIsAvatarMenuOpen(!isAvatarMenuOpen)
    }

    function navigateLink(route: string) {
        setIsAvatarMenuOpen(false)
        router.push(route);
    }

    function handleSignOut() {
        signOut()
    }

    // Adiciona evento de clique global para fechar o menu quando clicar fora dele
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsAvatarMenuOpen(false)
            }
        }
        if (isAvatarMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            //console.log('adiconou eventListner')
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            //console.log('removeu eventListner')
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            //console.log('adiconou eventListner no return')
        };
    }, [isAvatarMenuOpen])

    // Função para pegar as iniciais
    const getInitials = (name: string | undefined) => {
        if (!name) return "CN";
        const nameArray = name.split(" ");
        const initials = nameArray.slice(0, 2).map(n => n.charAt(0)).join("");
        return initials.toUpperCase();
    };

    return (
        <div className="relative w-full h-16 px-4 gap-4 flex items-center justify-end bg-bg-tertiary" >
            <ThemeSwitch />
            <BellIcon className="w-8 h-8" />
            {!user ? (
                <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-zinc-200 animate-spin" />
                </div>
            ) : (
                <div onClick={handleOpenAvatarMenu} className="cursor-pointer">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} className="h-12 w-12" />
                        <AvatarFallback className="h-12 w-12 bg-blue-600">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            )}
            {isAvatarMenuOpen &&
                <div ref={menuRef}
                    className="absolute top-[60px] flex flex-col gap-2 py-2 items-center rounded-md  bg-bg-secondary border-1 border-fg-tertiary w-36 transition-all 
                    duration-300"
                >
                    <button
                        className="hover:bg-white dark:hover:bg-black w-full relative"
                        onClick={() => navigateLink('/app/profile')}
                    >
                        <span className="text-text-primary">
                            Perfil
                        </span>
                    </button>
                    <button
                        className="hover:bg-white dark:hover:bg-black w-full opacity-100"
                        onClick={handleSignOut}
                    >
                        <span className="text-text-primary">
                            Sair
                        </span>
                    </button>
                </div>}

        </div>
    )

}