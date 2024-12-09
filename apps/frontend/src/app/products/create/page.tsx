import { fetchCategories } from "@/actions/actions-categories";
import FormProducts from "@/components/forms/form-products";
import { Category } from "@/lib/types";



export default async function ProductCreate() {
  
  const categories = await fetchCategories('');

  return (
    <section className='w-full p-5'>
      <h2 className="mb-10">Create Product</h2>
      <FormProducts
        categories={categories}
      />
    </section>

  )
}
