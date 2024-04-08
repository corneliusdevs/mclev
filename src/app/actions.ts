'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(route:string) {

    // add slash to route e.g /about to navigate home, pass "/"
  redirect(`${route}`)
}