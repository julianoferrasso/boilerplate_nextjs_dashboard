import { createContext, useEffect, useState, ReactNode } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "@/lib/utils";
import { useRouter } from 'next/navigation';

type ApiResponse = {
    data: {
        message: string
    };
};

type SignInData = {
    email: string;
    password: string;
}

type SignUpData = {
    name: string;
    email: string;
    celular: string;
    cpf?: string;
    cnpj?: string;
    password: string;
}

type User = {
    name: string;
    email: string;
    tokenEmailVerified: string;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isErrorLogin: string;
    isErrorSignUp: string;
    signIn: (data: SignInData) => Promise<void>;
    signUp: (data: SignUpData) => Promise<ApiResponse>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isErrorLogin, setIsErrorLogin] = useState<string>("")
    const [isErrorSignUp, setIsErrorSignUp] = useState<string>("")
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const router = useRouter();

    // atualizar os dados do usuario
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
            } catch (error: any) {
                console.log('Erro ao chamar /user/profile:', error.response.data.message);
            }
        }
        getProfile()
        // verficar necessidade de router como dependencia
    }, [router])

    async function signIn({ email, password }: SignInData) {
        try {
            setIsLoading(true);
            setIsErrorLogin('')
            const response = await api.post('/auth/login', { email, password })
            // console.log('dados response:', response.data)
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
            setUser(user)
            setIsAuthenticated(true)
            router.push('/app')
        } catch (error: any) {
            if (error.response.status === 401) {
                setIsErrorLogin('Usuário ou senha incorreta')
            } else {
                console.log('Erro ao fazer login, tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function signUp({ name, email, celular, cpf, cnpj, password }: SignUpData) {
        try {
            setIsLoading(true);
            setIsErrorSignUp('')
            const response = await api.post('/auth/signup', { name, email, celular, cpf, cnpj, password })
            const { tokenEmailVerified } = response.data.userCreated
            const newUser = { name, email, tokenEmailVerified }
            setUser(newUser)
            return (response)
        } catch (error: any) {
            setIsErrorSignUp(`${error.response.data.message}`)
            throw new Error(`Erro no cadastro: ${error.response.data.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    async function signOut() {
        try {
            // Remover o cookie do token
            destroyCookie(undefined, 'boilerplateNext_token')

            // Remover o token do cabeçalho padrão da API
            // api.defaults.headers['Authorization'] = undefined
            delete api.defaults.headers['Authorization']

            // Resetar o estado do usuário
            setUser(null)

            // Redirecionar o usuário para a página de login
            router.push('/auth')

        } catch (error: any) {
            console.log("logout error na pagina Contexto: ", error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, isErrorLogin, isErrorSignUp, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}