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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useRouter } from "next/navigation"
import { createCategory } from "@/actions/actions-categories"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  order: z.preprocess((val) => Number(val), z.number().min(1, {
    message: "Order must be at least 1.",
  })),
})

export default function FormCategories() {
  const { toast } = useToast()
  const router = useRouter()


  const categoryForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      order: 1,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: `Creating category...`,
      duration: 3000,
    })
    const createRequest = await createCategory(values)
    if(!createRequest?.error) {
      toast({
        title: `Category created!`,
        color:"green"
      })
      router.push('/categories');
    }else{
      toast({
        title: `${createRequest?.error}`,
        color:"red"
      })
    }
  }

  return (
    <div className='w-8/12 m-auto'>
      <Form {...categoryForm}>
        <form onSubmit={categoryForm.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={categoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of your category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={categoryForm.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input placeholder="Order of your product" type='number' {...field} />
                    </FormControl>
                    <FormDescription>
                      {`This order will determine the position of the category in the Bike shop.`}<br />
                      {`If another category has the same order, it will be replaced.`}
                    </FormDescription>
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
  )
}
