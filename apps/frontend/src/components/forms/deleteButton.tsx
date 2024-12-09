'use client'

import { ELEMENTS } from "@/lib/types"
import { Button } from "../ui/button"
import { deleteProduct } from "@/actions/actions-products"
import { useToast } from "@/hooks/use-toast"



export default function DeleteButton({element, id} : {element: string, id: string}) {
  const { toast } = useToast()

  const onDelete = async (id: string) => {
    const deleteRequest = await deleteProduct(id);
    if(!deleteRequest?.error) {
      toast({
        title: `Product deleted!`,
        color:"green"
      })
    }else{
      toast({
        title: `${deleteRequest?.error}`,
        color:"red"
      })
    }
    console.log('deleteRequest', deleteRequest)
  }

  return (
    <Button
      onClick={() => {
        // Validacion basica para confirmar si se desea eliminar un elemento
        // TODO: Estilizar el modal de confirmacion
        if (confirm(`Are you sure you want to delete?`)) {
          console.log(`Deleting ${element} ${id}`)
          if(element === ELEMENTS.PRODUCT) {
            console.log('Deleting product')
            onDelete(id)
          } else if(element === ELEMENTS.RULE) {
            console.log('Deleting rule')
          }
        }
      }
      }
    >
      Delete
    </Button>
  )
}
