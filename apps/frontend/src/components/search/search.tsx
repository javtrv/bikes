'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname, useRouter } from "next/navigation" 

import Link from "next/link"
import { useDebouncedCallback } from "use-debounce"

export default function Search({
  placeholder,
  textButtom,
  href
}:{
  // Esto se puede refactorizar para no utilizar props
  // sino usar el strategy pattern y buscar por un key
  placeholder: string
  textButtom: string
  href: string
}) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)

  },300)

  return (
    <section className='flex justify-center p-5'>
      <Input type="text" placeholder={placeholder} className="mr-4" 
        onChange={(e) => handleSearch(e.target.value)} 
        defaultValue={searchParams.get('query')?.toString() || ''}
      />
      <Link href={href}><Button>{textButtom}</Button></Link>
    </section>
  )
}
