'use client'
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import Select from 'react-select'
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
  Select as _Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRouter } from "next/navigation"
import { Category, Product } from "@/lib/types"
import { createProduct } from "@/actions/actions-products"
import createRule from "@/actions/actions-rules"


const formSchema = z.object({
  product: z.string().min(1, {
    message: "Product is required.",
  }),
  amount: z.preprocess((val) => Number(val), z.number().min(0, {
    message: "Amount is required.",
  })),
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  productList: z.array(z.string(), {
    message: "Product list is required.",
  }),
})

interface FormRulesProps {
  products: Product[];
}

export default function FormRules({products}: FormRulesProps) { 

  const { toast } = useToast()
  const router = useRouter();


  const ruleForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      amount: 0,
      type: "",
      productList:[]
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {

    const formatedValues = {
      ...values,
      product: {
        id: values.product
      },
      amount: values.type === 'FORBIDDEN' || values.type === 'ONLY' ? 0 : values.amount
    }
    toast({
      title: `Creating rule...`,
      duration: 3000,
    })

    console.log('formatedValues:', formatedValues)
    const createRequest = await createRule(formatedValues);
    if(!createRequest?.error) {
      toast({
        title: `Rule created!`,
        color:"green"
      })
      router.push('/rules');
    }else{
      toast({
        title: `${createRequest?.error}`,
        color:"red"
      })
    }
  }

  return (
    <>
    {products.length >= 0 && (
        <div className='w-8/12 m-auto'>
        <Form {...ruleForm}>
          <form onSubmit={ruleForm.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <FormField
                  control={ruleForm.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product</FormLabel>
                        <_Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name} - {product.category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </_Select>
                        <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={ruleForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <_Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* Estas opciones pudiera venir de una tabla en la BD */}
                              <SelectItem value={'ONLY'}>
                                {'Only with'}
                              </SelectItem>
                              <SelectItem value={'FORBIDDEN'}>
                                {'Forbidden with'}
                              </SelectItem>
                              <SelectItem value={'DISC'}>
                                {'Discount'}
                              </SelectItem>
                              <SelectItem value={'INCR'}>
                                {'Increase'}
                              </SelectItem>
                          </SelectContent>
                        </_Select>
                        <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={`flex flex-col space-y-1.5
                  ${ruleForm.watch('type') === 'FORBIDDEN' || ruleForm.watch('type') === 'ONLY' || ruleForm.watch('type') === '' ? 
                    'hidden' : 'block'
                  }
                `}>
                <FormField
                  control={ruleForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="Price of your product" type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={`flex flex-col space-y-1.5
                  ${ruleForm.watch('product') === '' ? 
                    'hidden' : 'block'}
                `}>
                  <Controller
                    name="productList"
                    control={ruleForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ProductList</FormLabel>
                        <Select
                          options={(() => {
                            const productListWithoutPrincipal = products.filter(product => product.id !== ruleForm.watch('product'))
                            const valuesArray =  productListWithoutPrincipal.map((product) => ({
                              value: product.id,
                              label: product.name + ' - ' + product.category.name,
                            }))
                            return valuesArray
                          })()}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption.map((option) => option.value))
                          }}
                        />
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
