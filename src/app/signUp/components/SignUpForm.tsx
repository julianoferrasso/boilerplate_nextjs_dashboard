'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Controller, useForm } from "react-hook-form"
import { useContext } from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaSpinner } from 'react-icons/fa';
import { AuthContext } from "@/contexts/AuthContext"
import Link from 'next/link';
import Image from "next/image";
import logo from "../../../../public/logo.png"

// Definindo o esquema de validação com zod

const celularSchema = z.string().regex(/^\+?[0-9]+$/, { message: 'Celular inválido' }).min(10, { message: 'Celular deve ter pelo menos 10 dígitos' });
const cpfCnpjSchema = z.string().regex(/^[0-9]{11,14}$/, { message: 'CPF/CNPJ inválido' }).min(11, { message: 'CPF/CNPJ deve ter pelo menos 11 dígitos' });
const signUpSchema = z.object({
    nome: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' }),
    celular: z.string().min(10, { message: 'Celular deve ter pelo menos 10 dígitos' }),
    cpf_cnpj: cpfCnpjSchema,
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUpForm() {
    const { control, register, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })
    const { signIn, isAuthenticated, user, isLoading, isErrorLogin } = useContext(AuthContext)

    async function handleSignUp(data: SignUpSchema) {
        try {
            await signIn(data)
            // console.log(`Fazendo sigIn no AuthForm`)
            // console.log(`isAuthenticated: ${isAuthenticated}`)
            // console.log(`user: ${user}`)
            // console.log(`data: ${JSON.stringify(data)}`)
        } catch (error) {
            console.log(`Erro na pagina AuthForm ${error}`)
        }
    }

    // mascara de celular
    const handleInputChange = (e: any) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca o código de área entre parênteses
        value = value.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca o hífen entre o quarto e o quinto dígitos
        e.target.value = value;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-500">
            <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">

                {/* Logo empresa */}
                <Image
                    src={logo}
                    width={300}
                    height={300}
                    alt="Logo do SaaS"
                />
                <h2 className="mb-6 text-xl font-bold text-center">Crie sua conta no Admin Places</h2>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="space-y-4">

                        {/* Input nome */}
                        <div className="relative">
                            <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="text"
                                placeholder="Nome Completo"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('nome')}
                            />
                            {errors.nome && (
                                <span className="text-red-400 text-sm">{errors.nome.message}</span>
                            )}
                        </div>

                        {/* Input email */}
                        <div className="relative">
                            <EmailIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="text"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className="text-red-400 text-sm">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Input celular */}
                        {/* <Controller
                            name="celular"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="(99) 99999-9999"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        field.onChange(e.target.value);
                                    }}
                                />
                            )}
                        /> */}
                        <div className="relative">
                            <CelularIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="number"
                                placeholder="Celular"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('celular')}
                            />
                            {errors.celular && (
                                <span className="text-red-400 text-sm">{errors.celular.message}</span>
                            )}
                        </div>

                        {/* Input CPF/CNPJ */}
                        <div className="relative">
                            <CardIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="number"
                                placeholder="CPF/CNPJ"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('cpf_cnpj')}
                            />
                            {errors.cpf_cnpj && (
                                <span className="text-red-400 text-sm">{errors.cpf_cnpj.message}</span>
                            )}
                        </div>

                        {/* Input senha */}
                        <div className="relative">
                            <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="password"
                                placeholder="Senha"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('password')}
                            />
                            {errors.password && (
                                <span className="text-red-400 text-sm">{errors.password.message}</span>
                            )}
                            {isErrorLogin != '' && (
                                <div className="rounded-md py-1 mt-3 flex items-center justify-center bg-red-200 border-1 border-red-400">
                                    <div className="text-red-600">{isErrorLogin}</div>
                                </div>
                            )}
                        </div>

                        {/* Input confirma senha */}
                        <div className="relative">
                            <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="password"
                                placeholder="Confirma senha"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>
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
                                'Cadastrar'
                            )}
                        </Button>
                    </div>

                </form>
                <div >
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <Link href="/auth">
                            Voltar
                        </Link>
                    </div>
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

