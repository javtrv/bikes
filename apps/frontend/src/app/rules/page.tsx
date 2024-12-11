import { fetchProducts } from "@/actions/actions-products"
import SearchByProduct from "@/components/search/search-by-product"
import TableRules from "@/components/tables/table-rules"
import { TrafficCone } from "lucide-react"
import { Suspense } from "react"

export default async function RulePage({searchParams}:{
  searchParams: {
    query: string
  }
}) {

  const {query} = searchParams
  const products = await fetchProducts('')


  return (
    <section className='w-full'>
      <div className='flex flex-row p-5 mb-5'>
        <TrafficCone size={40} />
        <h2 className='text-4xl font-bold text-left ml-1'>Rules</h2>
      </div>

      <SearchByProduct
        placeholder="Search rule by product name"
        textButtom="+ Create rule"
        href="/rules/create"
        products={products}
      />

      {query && (
         <div className="p-5">
         {/* TODO: Podemos crear un skeleton para la tabla */}
         <Suspense fallback={<div>Loading table...</div>}>
           <TableRules query={query}/>
         </Suspense>
       </div>
      )}
    </section>
  )
}
