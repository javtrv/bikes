'use client'

import { ELEMENTS } from "@/lib/types"
import { Button } from "../ui/button"
import { deleteProduct } from "@/actions/actions-products"
import { useToast } from "@/hooks/use-toast"
import { deleteRule } from "@/actions/actions-rules"



export default function DeleteButton({element, id} : {element: string, id: string}) {

  const { toast } = useToast()

  const onDelete = async (id: string) => {
    let deleteRequest
    if(element === ELEMENTS.PRODUCT){
       deleteRequest = await deleteProduct(id)
    } else {
       deleteRequest = await deleteRule(id)
    }
    if(!deleteRequest?.error) {
      toast({
        title: `Element deleted!`,
        color:"green"
      })
    }else{
      toast({
        title: `${deleteRequest?.error}`,
        color:"red"
      })
    }
  }

  return (
    <Button
      onClick={() => {
        // Validacion basica para confirmar si se desea eliminar un elemento
        // TODO: Estilizar el modal de confirmacion
        const message = 
        `Are you sure you want to delete this ${element}? 
        ${element === ELEMENTS.PRODUCT ? 
          'This will delete all the rules associated with this product' : 
          ''
        }` 
        if (confirm(message)) {
            onDelete(id)
        }
      }
      }
    >
      Delete
    </Button>
  )
}
