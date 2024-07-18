"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Profile() {
    const { user } = useContext(AuthContext)

    // Função para pegar as iniciais
    const getInitials = (name: string | undefined) => {
        if (!name) return "CN";
        const nameArray = name.split(" ");
        const initials = nameArray.slice(0, 2).map(n => n.charAt(0)).join("");
        return initials.toUpperCase();

    };
    return (
        <div className="bg-bg-secondary w-full h-full">

            <div className="bg-indigo-400 dark:bg-indigo-600 h-20 flex items-center justify-center">
                <Avatar className="h-24 w-24 -mb-14">
                    <AvatarImage src={user?.avatarUrl} className="h-24 w-24" />
                    <AvatarFallback className="h-12 w-12 bg-blue-600"> {getInitials(user?.name)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <span className="flex items-center justify-center mt-14 text-text-primary bg-bg-tertiary border-b border-bg-secondary">
                    {user?.name}
                </span>
                <span className=" flex items-center justify-center mt-0 text-text-primary bg-bg-tertiary border-b border-bg-secondary">
                    {user?.email}
                </span>
                <span className=" flex items-center justify-center mt-0 text-text-primary bg-bg-tertiary border-b border-bg-secondary">
                    Alterar Senha
                </span>
                <span className=" flex items-center justify-center mt-0 text-text-primary bg-bg-tertiary border-b border-bg-secondary">
                    Alterar Senha
                </span>
            </div>

        </div>
    )
}