'use client'

import { useContext } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaSpinner } from 'react-icons/fa';
import { AuthContext } from "@/contexts/AuthContext"
import Link from 'next/link';
import Image from "next/image";
import logo from "../../../../public/logo.png"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Define o esquema de validação com zod
const loginSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    rememberMe: z.boolean().optional()
});

type LoginSchema = z.infer<typeof loginSchema>

export function AuthForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })
    const { signIn, isAuthenticated, user, isLoading, isErrorLogin } = useContext(AuthContext)
    const router = useRouter()

    async function handleSignIn(data: LoginSchema) {
        try {
            await signIn(data)
            reset()
            router.push('/app')
        } catch (error) {
            console.log(`Erro na pagina AuthForm`)
        }
    }

    return (
        <div className="flex items-center px-2 justify-center min-h-screen bg-bg-primary">
            {/* Box login */}
            <div className="w-full max-w-md px-4 sm:px-4 rounded-lg shadow-lg bg-bg-tertiary">
                <div className="flex justify-center items-center">
                    <Image
                        src={logo}
                        width={150}
                        height={1500}
                        alt="Logo do SaaS"
                    />
                </div>
                <h2 className="mb-6 text-xl font-bold text-center text-text-secondary">Entre com seu email e senha</h2>

                {/* Formulario de login */}
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="space-y-4">

                        {/* input email */}
                        <div className="relative">
                            <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="email"
                                placeholder="Email"
                                className="pl-10 border-zinc-400 border-1"
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className="text-red-400 text-sm pl-4">{errors.email.message}</span>
                            )}
                        </div>

                        {/* input Password */}
                        <div className="relative">
                            <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="password"
                                placeholder="Senha"
                                className="pl-10 border-zinc-400 border-1"
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

                        {/* checkbox remeber me e link Esqueci Senha*/}
                        <div className="flex justify-between items-center px-2">
                            <div className="flex items-center">
                                <Input
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register('rememberMe')}
                                    className="w-4 h-4"
                                />

                                <label
                                    className="ml-1 text-text-tertiary text-sm focus-visible:ring-blue-600 focus-visible:ring-1 focus-visible:ring-offset-1"
                                    htmlFor="rememberMe">
                                    Manter conectado
                                </label>
                            </div>

                            <div>
                                <Link
                                    href="/recoverPassword"
                                    className="text-sm text-text-tertiary hover:text-link-tertiary"
                                >
                                    Esqueci minha senha
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">
                        {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </form>

                {/* Links para termos de uso e politica de privacidade  */}
                <div >
                    <div className="mt-6">
                        <p className="text-center text-sm text-text-tertiary">
                            Não é um membro?{' '}<br />
                            <Link href="/signUp" className="font-semibold leading-6 text-link-primary hover:text-link-tertiary">
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