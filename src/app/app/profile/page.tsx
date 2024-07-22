//https://www.youtube.com/watch?v=6dxngWXxgb4

// - quero que adapte o meu codigo para continuar usando o react-hook-form e 
// - inclua o zod para fazer o schema e que tenha dois submits independente um do outro, 
// - um que seja para a alteração de nome email e celular e 
// - outro para o upload da foto e 
// - quero tambem que ao selecionar uma foto seja exibido um modal para o usuario posicionar a 
// foto num quadrado que ira recortar somente a parte selecionada


"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


export const userProfileSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    celular: z.string().optional(),
});

export const avatarUploadSchema = z.object({
    profilePicture: z.instanceof(File).optional(),
});


export default function Profile() {
    const { user, updateUser } = useContext(AuthContext)
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [celular, setCelular] = useState(user?.celular || '');
    const [isLoading, setIsLoading] = useState(false);

    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

    const { control, handleSubmit: handleProfileSubmit, setValue: setProfileValue } = useForm({
        resolver: zodResolver(userProfileSchema),
        defaultValues: { name, email, celular }
    });

    const { handleSubmit: handleAvatarSubmit, setValue: setAvatarValue } = useForm({
        resolver: zodResolver(avatarUploadSchema),
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cropperRef = useRef<any>(null);

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
            setAvatarUrl(user.avatarUrl || '');
        }
    }, [user]);


    const handleProfileFormSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await updateUser({ name: data.name, email: data.email });
            toast.success('Dados atualizados com sucesso!', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            toast.error('Erro ao atualizar dados do usuário.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadAvatar = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        setUploadingAvatar(true);

        try {
            const response = await fetch('/api/user/update-profile-picture', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajuste conforme necessário
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Foto de perfil atualizada com sucesso!', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setAvatarUrl(result.avatarUrl); // Atualize o URL da foto de perfil
            } else {
                toast.error(result.message || 'Erro ao atualizar a foto de perfil.');
            }
        } catch (error) {
            toast.error('Erro ao atualizar a foto de perfil.');
        } finally {
            setUploadingAvatar(false);
            setFile(null);
            setShowCropper(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setShowCropper(true);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            setCroppedImage(cropperRef.current.getCroppedCanvas().toDataURL());
        }
    };

    const handleCropSubmit = async () => {
        if (croppedImage) {
            const blob = await fetch(croppedImage).then(r => r.blob());
            const file = new File([blob], 'profile-picture.png', { type: blob.type });
            setFile(file);
            handleUploadAvatar();
        }
    };


    const showToast = () => {
        toast.success('A foto foi clicada!', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            // theme: "colored",
        });
    };


    return (
        <div className="bg-bg-primary w-full h-full">

            <div className="bg-indigo-400 dark:bg-indigo-700 h-32 flex items-center justify-center">
                <div className="relative -mb-14 ">
                    <Avatar className="h-36 w-36">
                        <AvatarImage src={user?.avatarUrl} className="h-36 w-36" />
                        <AvatarFallback className="bg-blue-500"> {getInitials(user?.name)}</AvatarFallback>
                    </Avatar>
                    <div onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 m-1 ring-2 rounded-full p-1 bg-zinc-700/70 ring-green-400 dark:ring-white cursor-pointer"
                    >
                        <RefreshCw className="h-6 w-6 stroke-green-400 dark:stroke-green-500 stroke-2 " />
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div>
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 text-text-primary">Meu perfil</h1>
                    <form className="bg-bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    </form>
                </div>


            </div>

        </div >
    )
}