import { Table } from "semantic-ui-react"
import { Category } from "../models/category"
import ProductRows from "./product-rows"

interface CategoryRowsParams {
  categories: Category[]
}

const CategoryRows = ({ categories }: CategoryRowsParams) => <>
  {categories.map(({ name, products }, index) => (
    <>
      <Table.Row key={index}>
        <Table.HeaderCell width={3}>{name}</Table.HeaderCell>
      </Table.Row>

      <ProductRows products={products} />
    </>
  ))}
</>

export default CategoryRows
