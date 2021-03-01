import { memo } from 'react'
import { Table, Label } from 'semantic-ui-react'
import Product from '../../models/product'
import OrderActions from './order-actions'

interface ProductRowsProps {
  products: Product[]
  isLoggedIn: boolean
}

interface ProductRowProps {
  product: Product
  isLoggedIn: boolean
}

const ProductRow = ({ product, isLoggedIn }: ProductRowProps) => (
  <Table.Row>
    <Table.Cell className="product-row-name">{product.name}</Table.Cell>

    <Table.Cell singleLine>{product.price} грн</Table.Cell>

    <Table.Cell singleLine className='product-row-actions'>
      {
        product.count === 'Очікується'
          ? <Label color='yellow'>Очікується</Label>
          : isLoggedIn
            ? <OrderActions product={product} />
            : <Label color='green'>В наявності</Label>
      }
    </Table.Cell>
  </Table.Row>
)

const MemoizedProductRow = memo(ProductRow, (prev, next) => {
  return prev.isLoggedIn === next.isLoggedIn && prev.product.id === next.product.id
})

const ProductRows = ({ products, isLoggedIn }: ProductRowsProps) => <>
  <Table.Body>
    {products.map(p => <MemoizedProductRow key={p.id} product={p} isLoggedIn={isLoggedIn} />)}
  </Table.Body>
</>


export default ProductRows
