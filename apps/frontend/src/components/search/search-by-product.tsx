'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams, usePathname, useRouter } from "next/navigation" 

import Link from "next/link"
import { Product } from "@/lib/types"


export default function SearchByProduct({
  placeholder,
  textButtom,
  href,
  products
}:{
  placeholder: string
  textButtom: string
  href: string,
  products: Product[]
}) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)

  }

  return (
    <section className='w-100 flex justify-center p-5'>
      <Select onValueChange={(e)=>{
        handleSearch(e)
      }}
      >
        <SelectTrigger className="w-11/12 mr-5">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {products.map((product) => (
            <SelectItem key={product.id} value={product.id}>{product.name} - {product.category.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Link href={href}><Button>{textButtom}</Button></Link>
    </section>
  )
}
