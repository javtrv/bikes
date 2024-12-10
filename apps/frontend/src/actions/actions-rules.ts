'use server'

import { RuleDto } from "@/lib/types";
import { revalidatePath } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default async function createRule(rule: RuleDto): Promise<{error?: string} | undefined> {

  try {

    const response = await fetch(`${apiUrl}/rules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rule),
    });

    const data = await response.json()
    
    if (data.error) throw new Error(data.message)
    revalidatePath('/rules')
    
  } catch (error) {
    return {error: String(error)}
  }

}

export async function deleteRule(id: string) : Promise<{error?: string} | undefined> {
  try{
    const response = await fetch(`${apiUrl}/rules/${id}`, {
      method: 'DELETE',
    })

    const data = await response.json()
    console.log("DATA de Tainy en eliminar:", data)
    

    if (data.error) throw new Error(data.message)
    revalidatePath('/rules')
  }catch(error){
    console.log('Error:', error)
    return {error: String(error)}
  }
}