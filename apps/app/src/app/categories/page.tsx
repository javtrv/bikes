
import { fetchCategories } from "@/actions/actions-categories"
import { CategoriesTable } from "@/components/tables/table-categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default async function CategoriesPage() {

  const categories = await fetchCategories()

  return (
    <section className='w-full'>
      <h2>Categories</h2>

      <section className='flex justify-center p-5'>
          <Input type="text" placeholder="Search categories" className="mr-4" />
          <Link href='/categories/create'><Button>+ Create Category</Button></Link>
      </section>

      <div className="p-5">
        <CategoriesTable categories={categories}/>
      </div>

    </section>
  )
}
