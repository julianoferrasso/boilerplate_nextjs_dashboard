import { useForm, } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { toast, ToastOptions } from 'react-toastify';

const userProfileSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    celular: z.string().optional(),
});

type UserProfileSchema = z.infer<typeof userProfileSchema>;

export function UserForm() {
    const [isUpdating, setIsUpdating] = useState(false);
    const { user, updateUser } = useContext(AuthContext);

    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<UserProfileSchema>({
        resolver: zodResolver(userProfileSchema),
    });

    const initialData = useMemo(() => ({
        name: user?.name || '',
        email: user?.email || '',
        celular: user?.celular || '',
    }), [user]);

    useEffect(() => {
        setValue('name', initialData.name);
        setValue('email', initialData.email);
        setValue('celular', initialData.celular);
    }, [setValue, initialData]);

    const [name, email, celular] = watch(['name', 'email', 'celular']);
    const isFormChanged = useMemo(() => {
        return (
            name !== initialData.name ||
            email !== initialData.email ||
            celular !== initialData.celular
        );
    }, [name, email, celular, initialData]);

    async function handleUpdateUser(data: UserProfileSchema) {
        setIsUpdating(true);
        try {
            const response = await api.put('/user/updateprofile', data);
            updateUser(data);
            showToast("Perfil atualizado com sucesso.", "success");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ocorreu um erro ao atualizar o perfil.";
            showToast(errorMessage, "fail");
        } finally {
            setIsUpdating(false);
        }
    }

    function showToast(message: string, status: string) {
        const commonOptions: ToastOptions = {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        };

        if (status === 'success') {
            toast.success(message, commonOptions);
        } else {
            toast.error(message, commonOptions);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleUpdateUser)}
            className="bg-bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-8">
                <label
                    className="block text-text-secondary text-sm font-normal mb-1"
                    htmlFor="name">
                    Nome
                </label>
                <input
                    className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight"
                    id="name"
                    {...register('name')}
                />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="mb-8">
                <label
                    className="block text-text-secondary text-sm font-normal mb-1"
                    htmlFor="email">
                    Email
                </label>
                <input
                    className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight"
                    id="email"
                    {...register('email')}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="mb-8">
                <label
                    className="block text-text-secondary text-sm font-normal mb-1"
                    htmlFor="celular">
                    Celular
                </label>
                <input
                    className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight"
                    id="celular"
                    {...register('celular')}
                />
                {errors.celular && <span>{errors.celular.message}</span>}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className={`bg-blue-600  text-text-primary font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUpdating || !isFormChanged ? 'opacity-50' : 'hover:bg-blue-700'}`}
                    disabled={isUpdating || !isFormChanged}
                >
                    {isUpdating ? (<Loader2 className="h-6 w-6 animate-spin text-text-primary" />) : 'Salvar'}
                </button>
            </div>
        </form>
    );
}
