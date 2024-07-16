import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import { parseCookies } from 'nookies'

const { 'boilerplateNext_token': token } = parseCookies()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL não está definida");
}

export const api = axios.create({
  baseURL: apiBaseUrl,
});

// Debugging
api.interceptors.request.use(config => {
  return config
})

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}
