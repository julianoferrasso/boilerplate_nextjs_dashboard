import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import { parseCookies } from 'nookies'

const { 'boilerplateNext_token': token } = parseCookies()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer tem o token ${token}`
}

console.log(`Bearer ${token}`)