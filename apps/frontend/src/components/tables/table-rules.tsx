

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
import { ELEMENTS, Product, Rule } from "@/lib/types"
import { fetchProduct, fetchProducts } from "@/actions/actions-products"


function getProductsNames(products : Product[], productsIds: string[]) : string {

  const productsNames = products.filter(product => productsIds.includes(product.id)).map(product => product.name)
  return productsNames.toString()
}

export default async function TableRules({query} : {query: string}) {

  const products = await fetchProducts('')
  const product = await fetchProduct(query) || {} as Product
  const rules : Rule[] = product.rules || []

  return (
    <>
      {product?.rules && product.rules.length > 0 ? (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Product</TableHead>
            <TableHead >Product List</TableHead>
            <TableHead >Type</TableHead>
            <TableHead >Amount</TableHead>
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              {/* Se pudiera mejorar como se muestran los productos con los que existe una regla */}
              <TableCell className="">{getProductsNames(products, rule.productList)}</TableCell>
              <TableCell className="" >{rule.type}</TableCell>
              <TableCell className="text-left font-bold">{rule.amount}</TableCell>
              <TableCell className="text-left">
              <DeleteButton element={ELEMENTS.RULE} id={rule.id} />
              </TableCell>  
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right">Rules:</TableCell>
            <TableCell className="text-left  font-bold">{rules.length || 0}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      ): (
        <div>No rules found for this product :(</div>
      )}
    </>
  )
}