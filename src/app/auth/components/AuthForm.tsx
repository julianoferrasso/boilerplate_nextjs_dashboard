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
import ThemeSwitch from "@/components/ThemeSwitch"
import { useTheme } from "next-themes"

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
    const { theme } = useTheme()

    async function handleSignIn(data: LoginSchema) {
        try {
            console.log(data)
            await signIn(data)
            //reset()
        } catch (error) {
            console.log(`Erro na pagina AuthForm ${error}`)
        }
    }

    return (
        <div>
            <div className="flex absolute bg-zinc-500">
                <ThemeSwitch />
            </div>

            {/* toda janela */}
            <div className="flex items-center justify-center min-h-screen bg-zinc-100">

                {/* formulario login */}
                <div className="w-full max-w-md p-4 bg-zinc-50 rounded-lg shadow-lg ">
                    <div className="flex justify-center items-center">
                        <Image
                            src={logo}
                            width={300}
                            height={300}
                            alt="Logo do SaaS"
                        />
                    </div>
                    <h2 className="mb-6 text-xl font-bold text-center">Entre com seu email e senha</h2>


                    <form onSubmit={handleSubmit(handleSignIn)} >

                        <div className="space-y-4 bg-background">
                            {/* input email */}
                            <div className="relative">
                                <UserIcon className="absolute w-5 h-5 text-zinc-400 left-3 top-3" />
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    // className="pl-10 placeholder:text-zinc-500 focus-visible:ring-blue-600"
                                    className="pl-10 "
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <span className="text-red-400 text-sm pl-4">{errors.email.message}</span>
                                )}
                            </div>
                            {/* input Password */}
                            <div className="relative">
                                <LockIcon className="absolute w-5 h-5 text-zinc-400 left-3 top-3" />
                                <Input
                                    type="password"
                                    placeholder="Senha"
                                    className="pl-10 "
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
                            <div className="flex justify-between px-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        className="rounded-md focus-visible:ring-blue-600 focus-visible:ring-1 focus-visible:ring-offset-1"
                                        {...register('rememberMe')}
                                    />
                                    <label
                                        className="ml-1 text-zinc-700 text-sm focus-visible:ring-blue-600 focus-visible:ring-1 focus-visible:ring-offset-1"
                                        htmlFor="rememberMe">
                                        Manter conectado
                                    </label>
                                </div>

                                <div>
                                    <Link
                                        href="/recoverPassword"
                                        className="text-md text-zinc-500 hover:text-zinc-800 "
                                    >
                                        Esqueci minha senha
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Button
                            name="login"
                            type="submit"
                            className="mt-8 w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin mx-auto" />
                            ) : (
                                'Entrar'
                            )}
                        </Button>

                    </form>
                    <div >
                        {/* <Button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-blue-800" name="signUp" type="submit">
                        <Link href="/signUp">
                            Crie sua conta
                        </Link>
                    </Button> */}
                        <div className="mt-6 text-center text-sm text-zinc-600 hover:text-zinc-800">
                            {/* <Link href="/recoverPassword">
                            Esqueci minha senha
                        </Link> */}
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