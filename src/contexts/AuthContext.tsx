import { createContext, useState } from "react"
import { ReactNode } from 'react'
import axios from 'axios'
import { setCookie } from 'nookies'

type SignIndata = {
    email: string;
    password: string;
}

type User = {
    id: string;
    name: string;
    email: string;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignIndata) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignIndata) {
        try {
            const response = await axios.post('http://localhost:3333/api/auth/login', { email, password })
            console.log("login com sucesso: ", response.data)
            const { token, user } = response.data
            // setCookie params
            // param1 = contexto da req - no lado do cliente
            // parma2 = nome do cookie
            // param3 = token
            // param4 = options
            setCookie(undefined, 'boilerplateNext.token', token, {
                maxAge: 60 * 60 * 1, //1 hour
                //httpOnly: true
            })
            setUser(user)
        } catch (error) {
            console.error("login error na pagina Contexto: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}