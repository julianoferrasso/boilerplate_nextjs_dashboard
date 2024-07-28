import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
// desarivado ao implementar cookie httpOnly
// import { parseCookies } from 'nookies'
// const { 'session_token': token } = parseCookies()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL não está definida");
}

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // Garante que os cookies são enviados com a requisição
});

// Debugging
api.interceptors.request.use(config => {
  // Inspeciona os detalhes da requisição
  // console.log('Requisição:', config);
  return config
})


