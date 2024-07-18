"use client"
import ThemeSwitch from "@/components/ThemeSwitch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthContext";
import { BellIcon } from "@heroicons/react/24/outline"
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function Header() {
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(AuthContext)

    console.log("user dendro de Header antes de chamar useEffect", JSON.stringify(user))

    // Função para pegar as iniciais
    const getInitials = (name: string | undefined) => {
        if (!name) return "CN";
        const nameArray = name.split(" ");
        const initials = nameArray.slice(0, 2).map(n => n.charAt(0)).join("");
        return initials.toUpperCase();

    };

    useEffect(() => {
        setIsLoading(false)
        console.log("user useEffect do Header", user?.avatarUrl)
        console.log("user useEffect do Header", JSON.stringify(user))
    }, [])

    return (
        <div className="w-full h-16 px-4 gap-4 flex items-center justify-end bg-bg-tertiary" >
            <ThemeSwitch />
            <BellIcon className="w-8 h-8" />
            {isLoading ? (
                <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-zinc-200 animate-spin" />
                </div>
            ) : (
                <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.avatarUrl} className="h-12 w-12" />
                    <AvatarFallback className="h-12 w-12 bg-blue-600"> {getInitials(user?.name)}</AvatarFallback>
                </Avatar>
            )}

        </div>
    )

}