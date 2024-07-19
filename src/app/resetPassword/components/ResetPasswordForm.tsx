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
import { Loader2 } from "lucide-react";
import { useSearchParams } from 'next/navigation'

const resetPasswordSchema = z.object({
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessage, setIsErrorMessage] = useState('')
    const [isSuccessMessage, setIsSuccessMessage] = useState('')

    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema)
    })


    async function handleResetPassword(data: ResetPasswordSchema) {
        try {
            const { password } = data
            console.log("password: ", password)
            setIsLoading(true)
            setIsErrorMessage('')
            const response = await api.post('/auth/resetPassword', { email, token, password })
            console.log(response.data.message)
            reset()
            setIsSuccessMessage('Senha redefinida com sucesso.')

        } catch (error: any) {
            if (error.response.data.message == "Token inválido") {
                setIsErrorMessage("Link de recuperação de senha inválido. Por favor solicite uma nova alteração de senha.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-bg-primary">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                <Image
                    src={logo}
                    width={300}
                    height={300}
                    alt="Logo do SaaS"
                />
                <h5 className="text-center text-2xl font-bold leading-9 tracking-tight text-text-primary">
                    Recupere sua senha
                </h5>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form onSubmit={handleSubmit(handleResetPassword)}>
                    <div className="space-y-4">

                        {/* Input senha */}
                        <div className="relative">
                            <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="password"
                                placeholder="Senha"
                                className="pl-10 border-zinc-400 border-1"
                                {...register('password')}
                            />
                            {errors.password && (
                                <span className="text-red-400 text-sm">{errors.password.message}</span>
                            )}
                        </div>

                        {/* Input confirma senha */}
                        <div className="relative">
                            <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="password"
                                placeholder="Confirma a senha"
                                className="pl-10 border-zinc-400 border-1"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>
                            )}
                        </div>

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

                        {/* botao cadastrar */}
                        {!isSuccessMessage && !isErrorMessage && (
                            <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">
                                {isLoading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    'Alterar Senha'
                                )}
                            </Button>
                        )}
                    </div>

                </form>
            </div>
        </div>
    )
}

function LockIcon(props: any) {
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
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}