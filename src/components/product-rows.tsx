import { Table, Label } from 'semantic-ui-react'
import Product from '../models/product'
import OrderActions from './order-actions'

interface ProductRowsProps {
  products: Product[]
}

const ProductRows = ({ products }: ProductRowsProps) => (
  <Table.Body>
    {products.map((product, index) => (
      <Table.Row key={index}>
        <Table.Cell>{product.name}</Table.Cell>

        <Table.Cell singleLine>{product.price} грн</Table.Cell>

        <Table.Cell singleLine className='product-row-actions'>
          {
            product.count === 'Очікується'
              ? <Label color='yellow'>Очікується</Label>
              : <OrderActions product={product} />
          }
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
)


export default ProductRows
