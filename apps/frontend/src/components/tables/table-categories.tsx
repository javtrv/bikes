
import { fetchCategories } from "@/actions/actions-categories"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

 
export default async function TableCategories({query} : {query: string}) {

  const categories = await fetchCategories(query)



  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead >Name</TableHead>
          <TableHead >Order</TableHead>
          <TableHead >Qty of Products</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.sort((a, b) => a.order - b.order).map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className="" >{category.order}</TableCell>
            <TableCell className="text-left font-bold">{category.products.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right">Categories:</TableCell>
          <TableCell className="text-left  font-bold">{categories.length || 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}