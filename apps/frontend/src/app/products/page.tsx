
import Search from "@/components/search/search";
import TableProducts from "@/components/tables/table-products";

import { Suspense } from "react";

export default function ProductPage({searchParams}:{
  searchParams: {
    query: string
  }
}) {

  const {query} = searchParams

  return (
    <section className='w-full'>
      <h2>Products</h2>

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
