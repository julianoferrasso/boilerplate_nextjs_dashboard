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
    rememberMe?: boolean;
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
    name?: string;
    email?: string;
    tokenEmailVerified?: string;
    avatarUrl?: string;
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
    const router = useRouter()

    // atualizar os dados do usuario
    useEffect(() => {
        const { 'boilerplateNext_token': token } = parseCookies()
        async function getProfile() {
            try {
                if (token) {
                    const response = await api.get('/user/profile')
                    setUser(response.data);
                    console.log('Dados do usuario no useEffect Do Auth Provider:', response.data);
                }
            } catch (error: any) {
                console.log('Erro ao chamar /user/profile:', error.response.data.message);
            }
        }
        getProfile()
        // verficar necessidade de router como dependencia
    }, [])

    async function signIn({ email, password, rememberMe = false }: SignInData) {
        try {
            setIsLoading(true);
            setIsErrorLogin('')
            const response = await api.post('/auth/login', { email, password })
            const { token, user } = response.data
            // setCookie params
            // param1 = contexto da req - no lado do cliente
            // parma2 = nome do cookie
            // param3 = token
            // param4 = options
            const maxAge = rememberMe ? 60 * 60 * 4 : undefined  //4 horas se nao tiver opção manter logado
            setCookie(undefined, 'boilerplateNext_token', token, {
                maxAge,
                path: '/'  // Certifique-se de que o cookie esteja disponível em todas as páginas
                //httpOnly: true, // Use se estiver configurando o cookie no lado do servidor
            })
            api.defaults.headers['authorization'] = `Bearer ${token}`
            setUser(user)
            setIsAuthenticated(true)
            console.log("dados do usuario no signIn", JSON.stringify(user))
            router.push('/app');

        } catch (error: any) {
            if (error.response.status === 401) {
                if (error.response.data.message == "Email não verificado") {
                    // salavar o email do usuario num cookie para poder reenviar o email de ativação na página emailVerify
                    setCookie(null, 'user_email', email, {
                        maxAge: 60 * 60 * 1, //1hora
                        path: '/'
                    })
                    // redirecionar para welcome
                    router.push('/emailVerify')
                } else {
                    setIsErrorLogin("Usuário ou senha incorreta")
                }
            } else {
                console.log('Erro ao fazer login, tente novamente');
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
            //const { tokenEmailVerified } = response.data.userCreated
            // salavar o email do usuario num cookie para poder reenviar o email de ativação na página welcome
            setCookie(null, 'user_email', email, {
                maxAge: 60 * 60 * 1, //1hora
                path: '/'
            })
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
            delete api.defaults.headers['Authorization']

            // Resetar o estado do usuário
            setUser(null)

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
