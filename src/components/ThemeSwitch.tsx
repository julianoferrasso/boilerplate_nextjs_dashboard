'use client'

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { FaSpinner, FaSun, FaMoon } from "react-icons/fa"


export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()

    function handleThemeDark() {
        console.log("clicou em mudar de tema para DARK")
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
    }
    function handleThemeLight() {
        console.log("clicou em mudar de tema para LIGHT")
        setTheme('light')
        localStorage.setItem('theme', 'light')
    }

    useEffect(() => {
        localStorage.setItem('theme', systemTheme || 'light');
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
            <div className="flex justify-center items-center w-8">
                <FaSpinner className="animate-spin mx-auto text-zinc-400" />
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center">
            {theme === 'dark' ? (
                <button onClick={handleThemeLight} className="w-6">
                    <SunIcon className="text-zinc-200 h-6" />
                </button>
            ) : (
                <button onClick={handleThemeDark} className="w-6">
                    <MoonIcon className="text-zinc-900 h-6" />
                </button>
            )}
        </div>
    )
}