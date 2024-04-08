import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateCreateAdminAccountPassword = (password:string)=>{
console.log("Comparing passwords ", process.env.ADMIN_SIGNUP_SECRET)
  return password === process.env.ADMIN_SIGNUP_SECRET
}