
import { fetchProducts} from "@/actions/actions-products"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DeleteButton from "../forms/deleteButton"
import { ELEMENTS } from "@/lib/types"

 
export default async function TableProducts({query} : {query: string}) {

  const products = await fetchProducts(query)
  console.log('products', products)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead >Name</TableHead>
          <TableHead >Price</TableHead>
          <TableHead >Category</TableHead>
          <TableHead >Qty of Rules</TableHead>
          <TableHead >Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="">{product.price}€</TableCell>
            <TableCell className="" >{product.category.name}</TableCell>
            <TableCell className="text-left font-bold">{product.rules?.length || 0}</TableCell>
            <TableCell className="text-left">
            <DeleteButton element={'product'} id={product.id} />
            </TableCell>  
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right">Products:</TableCell>
          <TableCell className="text-left  font-bold">{products.length || 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}