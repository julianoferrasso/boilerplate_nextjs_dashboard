import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

import logo from "../../../../public/logo.png"
import { api } from "@/lib/utils";
import { useForm } from "react-hook-form";


export function Welcome() {
    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessage, setIsErrorMessage] = useState('')
    const [isSuccessMessage, setIsSuccessMessage] = useState('')
    const { handleSubmit } = useForm()

    async function handleSendEmailAgain() {
        try {
            setIsLoading(true)
            setIsErrorMessage('')
            const response = await api.post('/auth/resetPassword', { email })
            console.log(response.data.message)
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
                <h5 className="text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
                    Cadastro realizado com sucesso!
                </h5>

                <p className="mt-10 text-center text-lg text-zinc-700">
                    Enviamos um email com um link de ativação da sua conta!
                </p>
                <p className="mt-2 text-center text-lg text-zinc-700">

                    Verifique sua caixa de entrada. Verifique também a pasta de spam ou lixo eletrônico.
                </p>
                <p className="mt-2 text-center text-lg text-zinc-700">
                    Se você não receber o email dentro de alguns minutos, clique no botão abaixo para reenviar o email de ativação.

                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(handleSendEmailAgain)}>
                    <div className="space-y-4">
                        {!isSuccessMessage &&
                            <div>
                                <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin mx-auto" />
                                    ) : (
                                        'Reenviar o e-mail de ativação'
                                    )}
                                </Button>

                            </div>
                        }
                    </div>
                </form>


            </div>
        </div >
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
