"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import ChangePictureProfileModal from './components/ChangePictureProfileModal';
import { UserForm } from "./components/UserForm";


const userProfileSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    celular: z.string().optional(),
});

type UserProfileSchema = z.infer<typeof userProfileSchema>

export default function Profile() {
    const { user } = useContext(AuthContext)
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [celular, setCelular] = useState(user?.celular || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form para atualizar dados usuario 
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<UserProfileSchema>({
        resolver: zodResolver(userProfileSchema)
    })

    function handleOpenModalChangePicture() {
        setIsModalOpen(true);
    };

    function handleCloseModalChangePicture() {
        setIsModalOpen(false);
    };

    function handleUpdateUser() {
        setIsLoading(true)
        try {
            console.log('atualizando usuario')
        } catch (error) {
            console.log('error: ' + error)
        } finally {
            setIsLoading(false)
        }
    }

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

    const showToast = () => {
        toast.success('A foto foi clicada!', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };
    return (
        <div className="bg-bg-primary w-full h-full">
            <ChangePictureProfileModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModalChangePicture}
            />
            {/* Header */}
            <div className="bg-indigo-400 dark:bg-indigo-700 h-32 flex items-center justify-center">
                {/* Profile picture */}
                <div className="relative -mb-14 ">
                    <Avatar className="h-36 w-36">
                        <AvatarImage src={user?.avatarUrl} className="h-36 w-36" />
                        <AvatarFallback className="bg-blue-500"> {getInitials(user?.name)}</AvatarFallback>
                    </Avatar>
                    <div
                        onClick={handleOpenModalChangePicture}
                        className="absolute bottom-0 right-0 m-1 ring-2 rounded-full p-1 bg-zinc-700/70 ring-green-400 dark:ring-white cursor-pointer"
                    >
                        <RefreshCw className="h-6 w-6 stroke-green-400 dark:stroke-green-500 stroke-2 " />
                    </div>
                </div>
            </div>
            <div>
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 ml-4 text-text-primary">Meu perfil</h1>
                    {/* <form
                        className="bg-bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit(handleUpdateUser)}
                    >
                        <div className="mb-8">
                            <label className="block text-text-secondary text-sm font-normal mb-1" htmlFor="name">
                                Nome
                            </label>

                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="name"
                                        type="text"
                                        {...field}
                                        className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight"
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-text-secondary text-sm font-normal mb-1" htmlFor="email">
                                Email
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="email"
                                        type="email"
                                        {...field}
                                        className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight"
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-text-secondary  text-sm font-normal mb-1" htmlFor="email">
                                Celular (WhatsApp)
                            </label>
                            <Controller
                                name="celular"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="celular"
                                        type="text"
                                        {...field}
                                        className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight"
                                    />
                                )}
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
                    </form> */}

                    <UserForm />
                </div>


            </div>

        </div >
    )
}