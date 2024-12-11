'use client'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useBikeFormContext } from '@/hooks/use-context'
import { useForm } from "react-hook-form"
 
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product } from '@/lib/types'
import { Bike, CircleCheck, Info, ShoppingCart } from "lucide-react"



const FormSchema = z.object({
  product: z
    .string({
      required_error: "Please select a product.",
    })
    .nonempty("Please select a product."),
})

export default function BikeForm() {
  const { bikeContext, setBikeContext } = useBikeFormContext()


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      product: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('on submit', data)
  }

  function applyRules(selectedProduct: Partial<Product>) {
    const { rules } = selectedProduct
    if (!rules) return

    rules.forEach((rule) => {
      const { type, productList } = rule
      switch (type) {
        case 'ONLY':
          setBikeContext(prevContext => ({
            ...prevContext,
            dinamicProducts: prevContext.dinamicProducts.filter(product => {
              const productInList = productList.includes(product.id || '')
              const sameCategory = productList.some(id => {
                const productInList = prevContext.dinamicProducts.find(p => p.id === id)
                return productInList?.category?.name === product.category?.name
              })
              return productInList || !sameCategory
            })
          }))
          break
        case 'FORBIDDEN':
          setBikeContext(prevContext => ({
            ...prevContext,
            dinamicProducts: prevContext.dinamicProducts.filter(
              product => !(product.id && productList.includes(product.id)))
          }))
          break
        default:
          break
      }
    })
  }

  // Se actualiza el monto total restando el precio del producto previamente seleccionado
  // y sumando el precio del nuevo producto seleccionado. También aplica las reglas de incremento
  // y decremento de monto basadas en los productos seleccionados.
  function applyAmountRules(prevValue: string) {

    const selectedProductId = form.getValues("product")
    const prevSelectedProduct = bikeContext.originalProducts.find(product => product.id === prevValue)
    const selectedProduct = bikeContext.originalProducts.find(product => product.id === selectedProductId)


    setBikeContext(prevContext => {
      let newTotalAmount = Number(prevContext.totalAmount)

      if(prevSelectedProduct?.category?.name === selectedProduct?.category?.name) {
        newTotalAmount -= Number(prevSelectedProduct?.price) || 0
      }
      newTotalAmount += Number(selectedProduct?.price) || 0


      const selectedProductsAux = [ ...prevContext.selectedProducts, selectedProduct ]

      prevContext.selectedProducts.forEach((_selectedProduct) => {
        const productWithRule = bikeContext.originalProducts.find(product => product.id === _selectedProduct?.id)

        let rules = productWithRule?.rules || []


        rules = rules.filter(rule => rule.type === 'INCR' || rule.type === 'DISC')
        rules.forEach(rule => {
          const { amount, productList } = rule
          // Revisamos si todos los productos de la lista de productos de la regla están seleccionados
          // Es decir si la regla se cumple
          const allProductsSelected = productList.every(id =>
            selectedProductsAux.some(product => product?.id === id)
          )

          if (allProductsSelected && amount) {
            if (rule.type === 'DISC') {
              newTotalAmount -= Number(amount)
            } else if (rule.type === 'INCR') {
              newTotalAmount += Number(amount)
            }
          }
        })
        
      })

      return {
        ...prevContext,
        totalAmount: newTotalAmount
      }
    })
  }

  // Al hacer click en siguiente se ctualiza el contexto de la bicicleta con el producto seleccionado, 
  // se actualiza el paso actual y aplica las reglas de forbidden y only.
  function handleNext() {
    const selectedProductId = form.getValues("product")
    const selectedProduct = bikeContext.dinamicProducts.find(product => product.id === selectedProductId)

    if (selectedProduct) {
      const updatedSelectedProducts = bikeContext.selectedProducts.filter(
      product => product.category?.name !== bikeContext?.stepList[bikeContext.actualStep]?.name
      )

      setBikeContext(prevContext => ({
      ...prevContext,
      selectedProducts: [
        ...updatedSelectedProducts,
        {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        category: { name: prevContext?.stepList[prevContext.actualStep]?.name || '' },
        }
      ],
      actualStep: prevContext.actualStep + 1,
      }))

      applyRules(selectedProduct)
      form.setValue("product", "")
    }
  }

  function handleReset() {
    setBikeContext({
      ...bikeContext,
      dinamicProducts: bikeContext.originalProducts,
      selectedProducts: [],
      actualStep: 0,
      totalAmount: 0
    })
    form.setValue("product", "")
    form.resetField("product")
    form.reset()
  }

  const categoryName = bikeContext?.stepList[bikeContext.actualStep]?.name
  const selectedProduct = form.watch("product")


  return (
    <>
    {
      bikeContext.dinamicProducts.length > 0 && (
        <div className='w-full m-auto'>

        <section className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 flex items-center">
          <Info className="mr-2" />
          <p>The form will ask you about the products by category. While selecting the products, the total amount will be updated.</p>
        </section>
        { !(bikeContext.actualStep === bikeContext.stepList.length) ? (
          <>
            <p className='font-bold text-lg'>{`Step #${bikeContext.actualStep + 1}`}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6 mt-5">
                <div className="grid w/full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{categoryName}</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              const prevValue = field.value
                              field.onChange(value)
                              form.clearErrors("product")
                              applyAmountRules(prevValue)
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bikeContext.dinamicProducts
                                .filter(product => product.category?.name === categoryName)
                                .map((product) => (
                                  <SelectItem key={product.id} value={product.id || ''}>
                                    {product.name} - {product.price}€
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>Select a product to calculate the estimated total amount</FormDescription>
                          <FormMessage/>

                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  {bikeContext.actualStep > 0 && (
                    <Button type="button" className='mr-10' onClick={handleReset}>Restart Form</Button>
                  )}

                    <Button type="button" onClick={handleNext} disabled={selectedProduct === ''}>Add product</Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
        <section className='text-center p-5 my-5 w-100'>
          <div className='flex flex-row justify-center mb-4'>
            <CircleCheck className="mr-2" />
            <p className='font-bold text-xl'>Form completed</p>
          </div>
          <Button className='text-sm' onClick={handleReset}>Try again</Button>
        </section>
      )}

        {/* Improve: Aqui pudieramos mostrar aparte cuanto es el agregado o descuento que se le hace al producto  */}
        <section className="p-4 mb-4 mt-5 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 flex flex-col">
        <div className='flex mb-4'>
          <Bike className="mr-2" />
          <p className='font-bold text-lg'>Your bike:</p><br/>
        </div>
          <ul>
            {bikeContext.selectedProducts.map(product => (
              <li key={product.id}>
                <b>{product.category?.name}</b>: {product.name} - {product.price}€
              </li>
            ))}
          </ul><br/>
          <h3 className='text-lg font-bold text-green-950'>Estimated total amount : {bikeContext.totalAmount} €</h3>
          <span>This price includes fees and offers</span>
        </section>
      </div>
      )
    }
  </>
  )
}

