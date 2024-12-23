"use server"

import { Product, ProductDto } from "@/lib/types"
import { revalidatePath } from "next/cache"


const apiUrl = process.env.NEXT_PUBLIC_API_URL


//TODO: Pudieramos refectorizar los fetch para hacerlos mas generales
// y que reciba el endpoint como parametro y el tipo de dato que se espera
export async function fetchProducts(query : string) : Promise<Product[]> {


  const response = await fetch(`${apiUrl}/products`)
  let data: Product[] = await response.json()

  if (query) {
    data = data.filter((product: Product) => {
      const name = product.name.toLowerCase()
      return name.includes(query.toLowerCase())
    });
  }

  const sortedProducts = data.sort((a, b) => {
    if ((a.category?.order ?? 0) < (b.category?.order ?? 0)) return -1
    if ((a.category?.order ?? 0) > (b.category?.order ?? 0)) return 1
    return 0
  })

  revalidatePath('/products')
  return sortedProducts
}

export async function fetchProduct(id: string) : Promise<Product | undefined> {
  const response = await fetch(`${apiUrl}/products/${id}`);
  const data: Product = await response.json();
  return data;
}

export async function createProduct(product: ProductDto) : Promise<{error?: string} | undefined> {
  try{
    const response = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })

    const data = await response.json()

    if (data.error) throw new Error(data.message)
    revalidatePath('/products')
  }catch(error){
    return {error: String(error)}
  }
}

export async function deleteProduct(id: string) : Promise<{error?: string} | undefined> {
  try{
    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: 'DELETE',
    })

    const data = await response.json()

    if (data.error) throw new Error(data.message)
    revalidatePath('/products')
  }catch(error){
    return {error: String(error)}
  }
}