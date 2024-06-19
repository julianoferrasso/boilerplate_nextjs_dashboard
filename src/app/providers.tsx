'use client'

import { AuthProvider } from "@/contexts/AuthContext";
// outros providers vão aqui, como ThemeProviders etc
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers
// https://vercel.com/guides/react-context-state-management-nextjs#using-context-in-client-components

import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}