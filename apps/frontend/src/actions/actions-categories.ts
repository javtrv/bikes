"use server"

import { Category, CategoryDto } from "@/lib/types"
import { revalidatePath } from "next/cache"


const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function fetchCategories(query : string) : Promise<Category[]> {


  const response = await fetch(`${apiUrl}/categories`)
  let data: Category[] = await response.json()

  if (query) {
    data = data.filter((category: Category) => {
      const name = category.name.toLowerCase()
      return name.includes(query.toLowerCase())
    })
  }

  revalidatePath('/categories')
  return data;
}

export async function createCategory(category: CategoryDto) : Promise<{error?: string} | undefined> {
  try{
    const response = await fetch(`${apiUrl}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    })

    const data = await response.json()

    if (data.error) throw new Error(data.message)
    revalidatePath('/categories')
  }catch(error){
    return {error: String(error)}
  }
}