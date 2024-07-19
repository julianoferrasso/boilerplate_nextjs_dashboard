"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Profile() {
    const { user, updateUser } = useContext(AuthContext)
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [celular, setCelular] = useState(user?.celular || '');
    const [isLoading, setIsLoading] = useState(false);

    // Função para pegar as iniciais
    const getInitials = (name: string | undefined) => {
        if (!name) return "CN";
        const nameArray = name.split(" ");
        const initials = nameArray.slice(0, 2).map(n => n.charAt(0)).join("");
        return initials.toUpperCase();
    };

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setCelular(user.celular || '');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateUser({ name, email });
            alert('Dados atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            alert('Erro ao atualizar dados do usuário.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-bg-primary w-full h-full">

            <div className="bg-indigo-400 dark:bg-indigo-700 h-32 flex items-center justify-center">
                <div className="-mb-14 ">
                    <Avatar className="h-36 w-36">
                        <AvatarImage src={user?.avatarUrl} className="h-36 w-36" />
                        <AvatarFallback className="bg-blue-500"> {getInitials(user?.name)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div>
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 text-text-primary">Meu perfil</h1>
                    <form onSubmit={handleSubmit} className="bg-bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-8">
                            <label className="block text-text-secondary text-sm font-normal mb-1" htmlFor="name">
                                Nome
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight "
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-text-secondary text-sm font-normal mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight "
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-text-secondary  text-sm font-normal mb-1" htmlFor="email">
                                Celular (WhatsApp)
                            </label>
                            <input
                                id="celular"
                                type="text"
                                value={celular}
                                onChange={(e) => setCelular(e.target.value)}
                                className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight "
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className={`bg-blue-500 hover:bg-blue-700 text-text-primary font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>


            </div>

        </div >
    )
}