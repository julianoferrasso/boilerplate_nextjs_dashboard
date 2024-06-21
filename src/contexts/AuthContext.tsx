import { createContext, useEffect, useState, ReactNode } from "react"
import { setCookie, parseCookies } from 'nookies'
import axios from 'axios'
import { api } from "@/lib/utils";

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

    useEffect(() => {
        const { 'boilerplateNext_token': token } = parseCookies()
        // console.log('boilerplateNext_token: #', token);

        async function getProfile() {
            try {
                if (token) {
                    console.log('vai chamar /user/profile ###########')
                    const response = await api.get('/user/profile')
                    console.log('Dados do perfil:', response);
                    //setUser(response);
                    console.log('Passou pelo response.data .....');
                }
            } catch (error) {
                console.log('Erro ao chamar /user/profile:', error.message);
            }
        }
        getProfile()
        console.log('Passou pelo useEffect .....');
    }, [])

    async function signIn({ email, password }: SignIndata) {
        try {
            const response = await api.post('/auth/login', { email, password })
            console.log("login com sucesso AuthContext function sigIn: ", response.data)
            const { token, user } = response.data
            // setCookie params
            // param1 = contexto da req - no lado do cliente
            // parma2 = nome do cookie
            // param3 = token
            // param4 = options
            setCookie(undefined, 'boilerplateNext_token', token, {
                maxAge: 60 * 60 * 1, //1 hour
                // path: '/', // Certifique-se de que o cookie esteja disponível em todas as páginas
                // httpOnly: true, // Use se estiver configurando o cookie no lado do servidor
            })
            console.log(`Chamou funcao signIn dentro de AuthProvider`)
            console.log(`user: ${user}`)
            console.log(`token: ${token}`)
            setUser(user)
        } catch (error) {
            console.log("login error na pagina Contexto: ", error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}