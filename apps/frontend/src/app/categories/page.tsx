
import Search from "@/components/search/search"
import TableCategories from "@/components/tables/table-categories"
import { Group } from "lucide-react"
import { Suspense } from "react"

export default function TablePage({searchParams}:{
  searchParams: {
    query: string
  }
}) {

  const {query} = searchParams

  return (
    <section className='w-full'>
      {/* Improve: Este titulo puede ser un componente unico, que reciba el icono y el texto */}
      <div className='flex flex-row p-5 mb-5'>
        <Group size={40} />
        <h2 className='text-4xl font-bold text-left ml-1'>Categories</h2>
      </div>

      <Search
        placeholder="Search categories"
        textButtom="+ Create category"
        href="/categories/create"
      />

      <div className="p-5">
        <Suspense fallback={<div>Loading table...</div>}>
          <TableCategories query={query}/>
        </Suspense>
      </div>

    </section>
  )
}
