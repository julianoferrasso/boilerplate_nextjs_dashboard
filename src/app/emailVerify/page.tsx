'use client'
import { useContext, useEffect } from "react";
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from "next/navigation";

import { EmailVerify } from "./components/emailVerify";

export default function RecoverPassword() {
    const { isAuthenticated } = useContext(AuthContext)

    const router = useRouter()

    // Impede de permanecer na pagina de auth caso o usuario se autentique e depois clique em voltar
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/app')
        }
    }, [router])

    return (
        <EmailVerify />
    )
}