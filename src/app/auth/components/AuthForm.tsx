'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaSpinner } from 'react-icons/fa';
import { AuthContext } from "@/contexts/AuthContext"
import Link from 'next/link';
import Image from "next/image";
import logo from "../../../../public/logo.png"

// Define o esquema de validação com zod
const loginSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
});

type LoginSchema = z.infer<typeof loginSchema>

export function AuthForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })
    const { signIn, isAuthenticated, user, isLoading, isErrorLogin } = useContext(AuthContext)

    async function handleSignIn(data: LoginSchema) {
        try {
            await signIn(data)
            //reset()
        } catch (error) {
            console.log(`Erro na pagina AuthForm ${error}`)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-500">
            <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
                <Image
                    src={logo}
                    width={300}
                    height={300}
                    alt="Logo do SaaS"
                />
                <h2 className="mb-6 text-xl font-bold text-center">Entre com seu email e senha</h2>
                <form onSubmit={handleSubmit(handleSignIn)}>

                    <div className="space-y-4">
                        <div className="relative">
                            <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="text"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className="text-red-400 text-sm pl-4">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="relative">
                            <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="password"
                                placeholder="Senha"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('password')}
                            />
                            {errors.password && (
                                <span className="text-red-400 text-sm pl-4">{errors.password.message}</span>
                            )}
                            {isErrorLogin != '' && (
                                <div className="rounded-md py-1 mt-3 flex items-center justify-center bg-red-200 border-1 border-red-400">
                                    <div className="text-red-600">{isErrorLogin}</div>
                                </div>
                            )}
                        </div>
                        <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">
                            {isLoading ? (
                                <FaSpinner className="animate-spin mx-auto" />
                            ) : (
                                'Entrar'
                            )}
                        </Button>
                    </div>

                </form>
                <div >
                    <Button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-blue-800" name="signUp" type="submit">
                        <Link href="/signUp">
                            Crie sua conta
                        </Link>
                    </Button>
                    <div className="mt-6 text-center text-sm text-zinc-600 hover:text-zinc-800">
                        <Link href="/recoverPassword">
                            Esqueci minha senha
                        </Link>
                        <p className="mt-6 text-center text-sm text-zinc-600">
                            Não é um membro?{' '}<br />
                            <Link href="/signUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Inicie uma avaliação gratuita de 14 dias
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
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


function UserIcon(props: any) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}