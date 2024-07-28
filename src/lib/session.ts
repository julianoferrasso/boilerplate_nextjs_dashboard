
'use server-only'

import { redirect } from "next/navigation"
import { api } from "./utils"

type User = {
    id: string,
    name: string,
    email: string,
    avatarUrl: string
}

type SignInResponse = {
    token: string,
    user: User
}

type redirectServerArg = {
    url: string
}
// export async function signInCall(email: string, password: string): Promise<SignInResponse> {
//     const response = await api.post('/auth/signin', { email, password })
//     const { token, user } = response.data
//     return { token, user }
// }

export function redirectServer(url: string) {
    console.log('redirecting to: ' + url)
    redirect(url)
}