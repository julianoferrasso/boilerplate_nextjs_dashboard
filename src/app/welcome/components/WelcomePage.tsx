'use client'
import { parseCookies } from 'nookies'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

import logo from "../../../../public/logo.png"
import { api } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Loader2 } from 'lucide-react';

export function WelcomePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessage, setIsErrorMessage] = useState('')
    const [isSuccessMessage, setIsSuccessMessage] = useState('')
    const { handleSubmit } = useForm()

    const { 'user_email': email } = parseCookies()

    async function handleSendEmailAgain() {
        try {
            setIsLoading(true)
            setIsErrorMessage('')
            setIsSuccessMessage('')
            if (email) {
                const response = await api.post('/auth/resendemail', { email })
                //console.log(response.data.message)
                setIsSuccessMessage('Email de ativação enviado com sucesso!')
            }
        } catch (error: any) {
            // console.log(`Error  ${error.response.data.message}`)
            setIsErrorMessage(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-bg-primary">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                <Image
                    src={logo}
                    width={300}
                    height={300}
                    alt="Logo do SaaS"
                />
                <h5 className="text-center text-2xl font-bold leading-9 tracking-tight text-text-primary">
                    Cadastro realizado com sucesso!
                </h5>

                <p className="mt-10 text-center text-lg text-text-secondary">
                    Enviamos um link de ativação da sua conta para o seu email.
                </p>
                <p className="mt-2 text-center text-lg text-text-secondary">
                    Verifique sua caixa de entrada. Verifique também a pasta de spam ou lixo eletrônico.
                </p>
                <p className="mt-3 text-center text-lg text-text-secondary">
                    Se você não receber o email dentro de alguns minutos, clique no botão abaixo para reenviar o email de ativação.
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(handleSendEmailAgain)}>
                    <div className="space-y-4">

                        <div>
                            <Button className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700" name="login" type="submit">
                                {isLoading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    'Reenviar e-mail de ativação'
                                )}
                            </Button>


                            {isErrorMessage != '' && (
                                <div className="rounded-md my-2 py-2 px-5 mt-3 flex items-center justify-center bg-red-200 border-1 border-red-600">

                                    <div className="text-zinc-600">{isErrorMessage}</div>
                                </div>
                            )}

                            {isSuccessMessage != '' && (
                                <div className="rounded-md my-2 py-2 px-5 mt-3 flex items-center justify-center bg-green-200 border-1 border-green-600">
                                    <div className="text-zinc-600">{isSuccessMessage}</div>
                                </div>
                            )}


                        </div>

                    </div>
                </form>

                {/* Link voltar */}
                <div className="mt-2 text-center text-sm text-gray-500">
                    <Button className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700" name="login" type="submit">
                        <Link href="/auth">
                            Ir para pagina de login
                        </Link>
                    </Button>
                </div>


            </div>
        </div >
    )
}
