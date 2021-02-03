import { Table } from "semantic-ui-react"
import { Product } from "../models/product"

interface ProductRowsParams {
  products: Product[]
}

const ProductRows = ({ products }: ProductRowsParams) => <>
  {products.map(({ name, price, count }, index) => (
    <Table.Row key={index}>
      <Table.Cell>{name}</Table.Cell>

      <Table.Cell>{price} грн</Table.Cell>

      <Table.Cell>{count}</Table.Cell>
    </Table.Row>
  ))}
</>

export default ProductRows
