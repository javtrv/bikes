import { fetchProducts } from "@/actions/actions-products";
import FormRules from "@/components/forms/form-rules";


export default async function RulesCreate(){
  
  const products = await fetchProducts('');

  return (
    <section className='w-full p-5'>
      <h2 className="mb-10">Create Rule</h2>
      <FormRules
        products={products}
      />
    </section>

  )
}
