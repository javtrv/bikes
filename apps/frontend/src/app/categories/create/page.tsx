import FormCategories from "@/components/forms/form-categories"
import { Group } from "lucide-react"


export default function CategoriesCreate() {
  return (
    <section className='w-full p-5'>
      <div className='flex flex-row p-5 mb-5'>
        <Group size={40} />
        <h2 className='text-4xl font-bold text-left ml-1'>Create Product</h2>
      </div>
      <FormCategories/>
    </section>

  )
}
