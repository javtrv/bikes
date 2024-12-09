
import Search from "@/components/search/search";
import SearchCategories from "@/components/search/search-categories";
import TableCategories from "@/components/tables/table-categories";
import { Suspense } from "react";

export default function TablePage({searchParams}:{
  searchParams: {
    query: string
  }
}) {

  const {query} = searchParams

  return (
    <section className='w-full'>
      <h2>Categories</h2>

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
