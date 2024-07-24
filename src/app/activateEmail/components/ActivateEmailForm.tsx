import { useEffect, useState, Suspense } from "react";
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
import { Loader2 } from "lucide-react";
import { useSearchParams } from 'next/navigation'



function ActivateEmailFormContent() {
    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessage, setIsErrorMessage] = useState('')
    const [isSuccessMessage, setIsSuccessMessage] = useState('')

    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    useEffect(() => {
        async function verifyEmail() {
            try {
                console.log("email: ", email)
                console.log("token: ", token)
                setIsLoading(true)
                setIsErrorMessage('')
                const response = await api.post('/auth/verifyemail', { email, token })
                console.log(response.data.message)
                setIsSuccessMessage('Email verificado com sucesso.')
            } catch (error: any) {
                if (error.response.data.message == "Email não cadastrado") {
                    setIsErrorMessage("Email não cadastrado. Por favor ......");
                }
                if (error.response.data.message == "Token inválido") {
                    setIsErrorMessage("Link de recuperação de senha inválido. Por favor .....");
                }
            } finally {
                setIsLoading(false);
            }
        }

        verifyEmail()
    }, [])



    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-bg-primary">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                <Image
                    src={logo}
                    width={300}
                    height={300}
                    alt="Logo do SaaS"
                />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                {/* Mensagem */}
                {!isSuccessMessage && !isErrorMessage && (
                    <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">
                        {isLoading &&
                            <div className="flex flex-row items-center justify-center gap-4">
                                <span>Verificando seu Email</span>
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        }
                    </Button>
                )}

                {isErrorMessage && (
                    <div>
                        <div className="rounded-md px-4 py-2 mt-3 flex items-center justify-center bg-zinc-200/10 border-1 border-red-500">
                            <span className="text-red-500 font-medium">{isErrorMessage}</span>
                        </div>
                        <Button className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700" name="login" type="submit">
                            <Link href="/recoverPassword">
                                Solicitar nova alteração de senha
                            </Link>
                        </Button>
                    </div>
                )}

                {isSuccessMessage && (
                    <div>
                        <div className="rounded-md px-4 py-2 mt-3 flex items-center justify-center bg-zinc-100/10 border-1 border-green-700">
                            <span className="text-green-700 font-medium">{isSuccessMessage}</span>
                        </div>
                        <Button className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700" name="login" type="submit">
                            <Link href="/auth">
                                Ir para pagina de login
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export function ActivateEmailForm() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ActivateEmailFormContent />
        </Suspense>
    );
}