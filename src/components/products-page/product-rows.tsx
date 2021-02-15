import { Table } from 'semantic-ui-react'
import Product from '../../models/product'

export type ProductRowElement = ({ product }: { product: Product }) => JSX.Element

interface ProductRowsProps {
  products: Product[]
  ProductRow: ProductRowElement
}

const ProductRows = ({ products, ProductRow }: ProductRowsProps) => (
  <Table.Body>
    {products.map((product, index) => (
      <Table.Row key={index}>
        <ProductRow product={product} />
      </Table.Row>
    ))}
  </Table.Body>
)


export default ProductRows
