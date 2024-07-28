// transferir estados isLoading, isError, isSuccess para os componentes que chamam??
'use client'
import { createContext, useEffect, useState, ReactNode } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { redirectServer } from "@/lib/session";

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
    celular?: string;
    tokenEmailVerified?: string;
    avatarUrl?: string;
}

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isErrorLogin: string;
    isErrorSignUp: string;
    signIn: (data: SignInData) => Promise<void>;
    signUp: (data: SignUpData) => Promise<ApiResponse>;
    signOut: () => void;
    updateUser: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    console.log("Chamou AuthContextProvider")
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isErrorLogin, setIsErrorLogin] = useState<string>("")
    const [isErrorSignUp, setIsErrorSignUp] = useState<string>("")
    const router = useRouter()

    // Se tiver token (usuario autenticado) entao atualizar os dados do usuario
    useEffect(() => {
        //const { 'session_id': token } = parseCookies()
        //console.log("useEffect do auth context ...", token)
        async function getProfile() {
            try {
                // if (token) {
                const response = await api.get('/user/profile')
                setUser(response.data);
                console.log('Dados do usuario no useEffect Do Auth Provider:', response.data);
                //}
            } catch (error: any) {
                console.log('Erro ao chamar /user/profile:', error.response.data.message);
            }
        }
        getProfile()
    }, [])

    async function signIn({ email, password, rememberMe = false }: SignInData) {
        try {
            setIsLoading(true);
            setIsErrorLogin('')
            const response = await api.post('/auth/signin', { email, password })
            const { user: usuario } = response.data
            // const { token, user: usuario } = response.data
            // console.log('Dados do token: ', token)
            // setCookie params
            // param1 = contexto da req - no lado do cliente
            // parma2 = nome do cookie
            // param3 = token
            // param4 = options
            // const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined  //30 dias se nao tiver opção manter logado 
            // setCookie(undefined, 'session_token', token, {
            //     maxAge,
            //     path: '/',  // Certifique-se de que o cookie esteja disponível em todas as páginas
            // })
            // api.defaults.headers['authorization'] = `Bearer ${token}`
            setUser(usuario)
            router.push('/app');

        } catch (error: any) {
            if (error.response.status === 401) {
                if (error.response.data.message == "Email_nao_verificado") {
                    // salavar o email do usuario num cookie para poder reenviar o email de ativação na página emailVerify
                    setCookie(null, 'user_email', email, {
                        maxAge: 60 * 60 * 1, //1hora
                        path: '/',
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
            await api.post('/auth/signout')
            // Resetar o estado do usuário
            setUser(null)

            router.push('/auth')

        } catch (error: any) {
            console.log("logout error na pagina Contexto: ", error.message)
        }
    }

    async function updateUser(data: Partial<User>) {
        try {
            setIsLoading(true);
            //const response = await api.put('/user/update', data);
            setUser(prevState => ({ ...prevState, ...data }));
            //console.log('Dados do usuario atualizados:', response.data);
        } catch (error: any) {
            console.log('Erro ao atualizar dados do usuário:', error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, isErrorLogin, isErrorSignUp, signIn, signUp, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}
