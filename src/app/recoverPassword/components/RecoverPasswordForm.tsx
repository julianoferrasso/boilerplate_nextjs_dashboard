import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

import logo from "../../../../public/logo.png"
import { api } from "@/lib/utils";

const recoverPasswordSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' })
});

type RecoverPasswordSchema = z.infer<typeof recoverPasswordSchema>

export function RecoverPasswordForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RecoverPasswordSchema>({
        resolver: zodResolver(recoverPasswordSchema)
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessage, setIsErrorMessage] = useState('')
    const [isSuccessMessage, setIsSuccessMessage] = useState('')

    async function handleRecoverPassword(data: RecoverPasswordSchema) {
        try {
            const { email } = data
            setIsLoading(true)
            setIsErrorMessage('')
            const response = await api.post('/auth/recoverPassword', { email })
            console.log(response.data.message)
            reset()
            setIsSuccessMessage('Email de recuperação enviado com sucesso! Acesse o link dentro de 1 hora e redefina sua senha.')

        } catch (error: any) {
            console.log(`Error  ${error.response.data.message}`)
            setIsErrorMessage(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                <Image
                    src={logo}
                    width={300}
                    height={300}
                    alt="Logo do SaaS"
                />
                <h5 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Recupere sua senha
                </h5>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(handleRecoverPassword)}>
                    <div className="space-y-4">
                        <div className="relative">
                            <EmailIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="email"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className="text-red-400 text-sm">{errors.email.message}</span>
                            )}
                            {isErrorMessage != '' && (
                                <div className="flex items-center justify-center">
                                    <div className="text-red-400">{isErrorMessage}</div>
                                </div>
                            )}
                            {isSuccessMessage && (
                                <div>
                                    <div className="text-green-700 mt-4 text-center">{isSuccessMessage}</div>
                                    <Button className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-800" name="login" type="submit">
                                        <Link href="/auth">
                                            Voltar para login
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                        {!isSuccessMessage &&
                            <div>
                                <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin mx-auto" />
                                    ) : (
                                        'Enviar'
                                    )}
                                </Button>
                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Informe seu email cadastrado que enviaremos um link para você recuperar sua senha
                                </p>
                            </div>
                        }
                    </div>
                </form>


            </div>
        </div>
    )
}

function EmailIcon(props: any) {
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}
