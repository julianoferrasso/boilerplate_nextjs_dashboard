import { createContext, useEffect, useState, ReactNode } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "@/lib/utils";
import { useRouter } from 'next/navigation';

type SignInData = {
    email: string;
    password: string;
}

type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = !!user;
    const router = useRouter();

    useEffect(() => {
        const { 'boilerplateNext_token': token } = parseCookies()

        async function getProfile() {
            try {
                if (token) {
                    const response = await api.get('/user/profile')
                    //console.log('Dados do perfil:', response.data);
                    setUser(response.data);
                    //console.log('Dados do estato user:', JSON.stringify(user));
                    router.push('/app')
                }
            } catch (error) {
                console.log('Erro ao chamar /user/profile:', error.response.data.message);
            }
        }
        getProfile()
    }, [])

    async function signIn({ email, password }: SignInData) {
        try {
            const response = await api.post('/auth/login', { email, password })
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

            api.defaults.headers['Authorization'] = `Bearer ${token}`
            // console.log('Dados do response:', response.data);
            setUser(user)
            // console.log('Dados do estato user:', JSON.stringify(user));
            // console.log(`user: ${JSON.stringify(user)}`)
            // console.log(`token: ${token}`)
            // console.log(`user no estado: ${user}`)
            router.push('/app')
        } catch (error) {
            console.log("login error na pagina Contexto: ", error.response.data.message)
        }
    }

    async function signOut() {
        try {
            // Remover o cookie do token
            destroyCookie(undefined, 'boilerplateNext_token')

            // Remover o token do cabeçalho padrão da API
            api.defaults.headers['Authorization'] = undefined

            // Resetar o estado do usuário
            setUser(null)

            // Redirecionar o usuário para a página de login
            router.push('/auth')

        } catch (error) {
            console.log("logout error na pagina Contexto: ", error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}