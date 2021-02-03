import { Breadcrumb, Table } from "semantic-ui-react"
import { Category } from "../models/category"
import ProductRows from "./product-rows"

interface CategoryRowsParams {
  categories: Category[]
}

interface CategoryNameParams {
  names: string[]
}

const CategoryRows = ({ categories }: CategoryRowsParams) => <>
  {categories.map(({ names, products }) => (
    <>
      {names && <CategoryHeader names={names} />}

      <ProductRows products={products} />
    </>
  ))}
</>

const CategoryHeader = ({ names }: CategoryNameParams) => <Table.Row>
  <Table.HeaderCell width={3}>
    <Breadcrumb icon='right angle' sections={names.map(name => ({ key: name, content: name }))} />
  </Table.HeaderCell>
</Table.Row>

export default CategoryRows
