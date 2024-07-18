'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { useContext } from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaSpinner } from 'react-icons/fa';
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import logo from "../../../../public/logo.png"
import { Loader2 } from "lucide-react"


const signUpSchema = z.object({
    // nome Captaliza prima letra da cada nome
    name: z.string()
        .min(1, { message: 'Nome é obrigatório' })
        .transform(name => {
            return name.trim() // Remove espaços em branco no início e no fim da string
                .toLowerCase() // Converte todas as letras para minúsculas
                .split(' ') // Divide a string em palavras usando o espaço como delimitador
                .map(word => {  // Aplica a transformação a cada palavra
                    return word[0].toLocaleUpperCase().concat(word.substring(1))  // Capitaliza a primeira letra e concatena com o resto da palavra
                }).join(' ')  // Junta as palavras transformadas de volta em uma única string, separadas por espaços
        }),
    email: z.string().email({ message: 'Email inválido' }).transform(email => {
        return email.toLowerCase()
    }),
    celular: z.string().min(10, { message: 'Celular deve ter pelo menos 10 dígitos' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUpForm() {
    const { signUp, isLoading, isErrorSignUp } = useContext(AuthContext)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    async function handleSignUp(data: SignUpSchema) {
        try {
            const response = await signUp(data)
            reset()
            router.push('/welcome')
        } catch (error) {
            console.log(`Erro na pagina AuthForm ${error}`)
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
                <h2 className="mb-6 text-xl font-bold text-center text-text-secondary">Crie sua conta no Admin Places</h2>

                {/* Se tive rmensagem de erro no cadastro */}
                {isErrorSignUp != '' && (
                    <div className="rounded-md my-2 py-2 px-5 mt-3 flex items-center justify-center bg-red-200 border-1 border-red-600">
                        <div className="text-zinc-600">{isErrorSignUp}</div>
                    </div>
                )}

                {/* Formulario de login */}
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="space-y-4">

                        {/* Input name */}
                        <div className="relative">
                            <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="text"
                                placeholder="Nome Completo"
                                className="pl-10 border-zinc-400 border-1"
                                {...register('name')}
                            />
                            {errors.name && (
                                <span className="text-red-400 text-sm">{errors.name.message}</span>
                            )}
                        </div>

                        {/* Input email */}
                        <div className="relative">
                            <EmailIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="text"
                                placeholder="Email"
                                className="pl-10 border-zinc-400 border-1"
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className="text-red-400 text-sm">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Input ceular */}
                        <div className="relative">
                            <CelularIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="number"
                                placeholder="WhatsApp"
                                className="pl-10 border-zinc-400 border-1"
                                {...register('celular')}
                            />
                            {errors.celular && (
                                <span className="text-red-400 text-sm">{errors.celular.message}</span>
                            )}
                        </div>

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
                                placeholder="Confirma senha"
                                className="pl-10 border-zinc-400 border-1"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>
                            )}
                        </div>

                        {/* botao cadastrar */}
                        <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">
                            {isLoading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                'Criar conta'
                            )}
                        </Button>

                    </div>

                </form>
                <div >
                    <p className="mt-1 text-center text-sm text-text-secondary">
                        Ao clicar em “Criar conta”, você concorda com os&nbsp;
                        <Link href="/useTerms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Termos de Uso
                        </Link>
                        &nbsp;e a&nbsp;
                        <Link
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Política de Privacidade
                        </Link> da plataforma.
                    </p>
                    <p className="mt-8 text-center text-sm text-text-secondary">
                        Já tem um cadastro?&nbsp;
                        <Link href="/auth" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Entre com sua conta.
                        </Link>
                    </p>
                </div>
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

function CelularIcon(props: any) {
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
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

function CardIcon(props: any) {
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}

function InfoIcon(props: any) {
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    )
}

