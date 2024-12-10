
import { fetchProducts } from "@/actions/actions-products";
import SearchByProduct from "@/components/search/search-by-product";
import TableRules from "@/components/tables/table-rules";


import { Suspense } from "react";

export default async function RulePage({searchParams}:{
  searchParams: {
    query: string
  }
}) {

  const {query} = searchParams
  const products = await fetchProducts('');

  return (
    <section className='w-full'>
      <h2>Rules</h2>

      <SearchByProduct
        placeholder="Search Rule by product name"
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
