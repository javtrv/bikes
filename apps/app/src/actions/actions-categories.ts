"use server"
import { Category } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories() : Promise<Category[]> {
  console.log('apiUrl', apiUrl)
  const response = await fetch(`${apiUrl}/categories`)
  const data = await response.json()
  return data as Category[]
}

// TODO: Pudieramos crear un CategoryDto
export async function createCategory(category: Partial<Category>)  {
  try{
    const response = await fetch(`${apiUrl}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    })
    const data = await response.json()
    console.log('data', data)
    
    if (data.error) throw new Error(data.message)
    revalidatePath('/categories')
  }catch(error){
    console.log('error', error)
    return {error}
  }
  

}