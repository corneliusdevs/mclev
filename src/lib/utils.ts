import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateCreateAdminAccountPassword = (password:string)=>{
console.log("Comparing passwords ", process.env.ADMIN_SIGNUP_SECRET)
  return password === process.env.ADMIN_SIGNUP_SECRET
}

export const getRegisterAdminSecret = ()=>{
  return process.env.REGISTER_ADMIN_TO_MSG_SERVER_SECRET
}

export  function formatTimeAMPM(dateInMillisecs: number) {
  let dateObject = new Date(dateInMillisecs)
  let hours = dateObject.getHours();
  let minutes:string | number = dateObject.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}