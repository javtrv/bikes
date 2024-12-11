import { fetchProducts } from "@/actions/actions-products"
import FormRules from "@/components/forms/form-rules"
import { SquareChartGantt, TrafficCone } from "lucide-react"


export default async function RulesCreate(){
  
  const products = await fetchProducts('')

  return (
    <section className='w-full p-5'>
    <div className='flex flex-row p-5 mb-5'>
      <SquareChartGantt size={40} />
      <h2 className='text-4xl font-bold text-left ml-1'>Create rule</h2>
    </div>
      <FormRules
        products={products}
      />
    </section>

  )
}
