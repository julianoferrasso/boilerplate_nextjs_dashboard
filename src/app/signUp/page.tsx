'use client'
import { useContext, useEffect } from "react";
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from "next/navigation";

import { SignUpForm } from "./components/SignUpForm"

export default function SignUp() {
    const { isAuthenticated } = useContext(AuthContext)

    const router = useRouter()

    // Impede de permanecer na pagina de signUp caso o usuario se autentique e depois clique em voltar
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/app')
        }
    }, [router])

    return (
        <SignUpForm />
    )
}