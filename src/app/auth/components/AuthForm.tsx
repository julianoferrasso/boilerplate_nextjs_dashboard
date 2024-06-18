
'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export function AuthForm() {
    const form = useForm()

    const handleSubmit = form.handleSubmit((data) => {
        console.log(data)
    })

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-500">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center">Logue com sua conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="text"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...form.register('email')}
                            />
                        </div>
                        <div className="relative">
                            <LockIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                            <Input
                                type="password"
                                placeholder="Senha"
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...form.register('password')}
                            />
                        </div>
                        <Button className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" name="login" type="submit">Entrar</Button>
                        <Button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-blue-800" name="recoverPassord" type="submit">Crie sua conta</Button>
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <a href="#" className="hover:underline">
                                Esqueci minha senha
                            </a>
                        </div>
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