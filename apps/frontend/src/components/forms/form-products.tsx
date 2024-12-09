'use client'
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRouter } from "next/navigation"
import { Category } from "@/lib/types"
import { createProduct } from "@/actions/actions-products"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.preprocess((val) => Number(val), z.number().min(0, {
    message: "Price is required.",
  })),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
})

interface FormProductsProps {
  categories: Category[];
}

export default function FormProducts({categories}: FormProductsProps) {
  const { toast } = useToast()
  const router = useRouter();


  const productForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: `Creating product...`,
      duration: 3000,
    })
    console.log('VALUES:', values)
    const createRequest = await createProduct(values);
    console.log('createRequest', createRequest)
    if(!createRequest?.error) {
      toast({
        title: `Product created!`,
        color:"green"
      })
      router.push('/products');
    }else{
      toast({
        title: `${createRequest?.error}`,
        color:"red"
      })
    }
  }

  return (
    <>
    {categories.length >= 0 && (
        <div className='w-8/12 m-auto'>
        <Form {...productForm}>
          <form onSubmit={productForm.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={productForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of your product" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
              <FormField
                control={productForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price of your product" type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={productForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className='mt-2'
              >
                Create
              </Button>
            </div>
          </form>
        </Form>

      </div>
    )}
  </>

  )
}
