import { fetchCategories } from "@/actions/actions-categories"
import FormProducts from "@/components/forms/form-products"
import { SquareChartGantt } from "lucide-react";




export default async function ProductCreate() {
  
  const categories = await fetchCategories('');

  return (
    <section className='w-full p-5'>
      <div className='flex flex-row p-5 mb-5'>
        <SquareChartGantt size={40} />
        <h2 className='text-4xl font-bold text-left ml-1'>Create Product</h2>
      </div>
      <FormProducts
        categories={categories}
      />
    </section>

  )
}
