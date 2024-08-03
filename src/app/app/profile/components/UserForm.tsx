import { useForm, } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const userProfileSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    celular: z.string().optional(),
});

type UserProfileSchema = z.infer<typeof userProfileSchema>

export function UserForm() {
    const [isUpdating, setIsUpdating] = useState(false)
    const { user, updateUser } = useContext(AuthContext)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserProfileSchema>({
        resolver: zodResolver(userProfileSchema),
    });

    useEffect(() => {
        user?.name && setValue('name', user.name);
        user?.email && setValue('email', user?.email);
        user?.celular && setValue('celular', user.celular);
    }, [setValue, user]);

    async function handleUpdateUser(data: UserProfileSchema) {
        setIsUpdating(true)
        try {
            const response = await api.put('/user/updateprofile', data)
            updateUser(data)
        } catch (error) {
            alert("Erro na atualizacao")
        } finally {
            setIsUpdating(false)
        }
    }


    return (
        <form
            onSubmit={handleSubmit(handleUpdateUser)}
            className="bg-bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-8">
                <label
                    className='className="block text-text-secondary text-sm font-normal mb-1"'
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
                    className='className="block text-text-secondary text-sm font-normal mb-1"'
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
                    className='className="block text-text-secondary text-sm font-normal mb-1"'
                    htmlFor="celular">
                    Celular
                </label>
                <input
                    className="bg-bg-secondary border-b-2 border-fg-secondary focus:border-indigo-600 focus:outline-none w-full py-2 px-3 text-text-secondary leading-tight"
                    id="celular"
                    {...register('celular')} />
                {errors.celular && <span>{errors.celular.message}</span>}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className={`bg-blue-600 hover:bg-blue-700 text-text-primary font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isUpdating}
                >
                    {isUpdating ? (<Loader2 className="h-6 w-6 animate-spin text-text-primary" />) : 'Salvar'}
                </button>
            </div>
        </form>
    )

}