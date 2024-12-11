import { fetchCategories } from "@/actions/actions-categories"
import { fetchProducts } from "@/actions/actions-products"
import BikeForm from "@/components/forms/form-bike"
import BikeFormProvider from "@/hooks/use-context"
import { Separator } from "@radix-ui/react-separator"

export default async function Home() {

  const products = await fetchProducts('')
  const categories = await fetchCategories('')

  return (
    <BikeFormProvider products={products} categories={categories}>
      <section className='w-full p-5'>
        <h1 className='text-4xl font-bold text-center p-5 mb-5'>Welcome to Markus’ Bike Shop!</h1>
        <h3 className='text-xl font-semibold text-center'>Let us customize your bike!</h3>
        <Separator className="border-gray-200 border my-4"/>
        <BikeForm />
      </section>
    </BikeFormProvider>
  );
}
