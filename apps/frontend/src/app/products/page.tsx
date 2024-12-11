import Search from "@/components/search/search"
import TableProducts from "@/components/tables/table-products"
import { SquareChartGantt } from "lucide-react"
import { Suspense } from "react"

export default function ProductPage({searchParams}:{
  searchParams: {
    query: string
  }
}) {

  const {query} = searchParams

  return (
    <section className='w-full'>
      <div className='flex flex-row p-5 mb-5'>
        <SquareChartGantt size={40} />
        <h2 className='text-4xl font-bold text-left ml-1'>Products</h2>
      </div>

      <Search
        placeholder="Search products"
        textButtom="+ Create product"
        href="/products/create"
      />

      <div className="p-5">
        {/* TODO: Podemos crear un skeleton para la tabla */}
        <Suspense fallback={<div>Loading table...</div>}>
          <TableProducts query={query}/>
        </Suspense>
      </div>

    </section>
  )
}
