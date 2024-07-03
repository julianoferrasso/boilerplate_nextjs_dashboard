'use client'

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { FaSpinner } from "react-icons/fa"


export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()

    function handleThemeDark() {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
    }
    function handleThemeLight() {
        setTheme('light')
        localStorage.setItem('theme', 'light')
    }

    useEffect(() => {
        // Set mounted to true after the component has mounted
        setMounted(true);

        // Check if theme is already set in localStorage
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            // Save system theme to localStorage on first visit
            const initialTheme = systemTheme || 'light';
            localStorage.setItem('theme', initialTheme);
            setTheme(initialTheme);
        }
    }, [setTheme, systemTheme]);


    if (!mounted) {
        return (
            <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin mx-auto text-zinc-400 w-8" />
            </div>
        )
    }

    const effectiveTheme = theme === 'system' ? systemTheme : theme;

    return (
        //otimizar botao de tema https://www.youtube.com/watch?v=MNf8DUej1Vo
        <div className="flex justify-center items-center ">
            {effectiveTheme === 'dark' ? (
                <button onClick={handleThemeLight} className="w-9 h-9 bg-zinc-950 rounded-full flex items-center justify-center">
                    <SunIcon className="text-zinc-200 w-8 h-8" />
                </button>
            ) : (
                <button onClick={handleThemeDark} className="w-9 h-9 bg-zinc-400 rounded-full flex items-center justify-center">
                    <MoonIcon className="text-zinc-900 w-8 h-8" />
                </button>
            )}
        </div>
    )
}