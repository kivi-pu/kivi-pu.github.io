import { useAuthState } from 'react-firebase-hooks/auth'
import { Table, Label } from 'semantic-ui-react'
import { auth } from '../../firebase-config'
import Product from '../../models/product'
import OrderActions from './order-actions'

interface ProductRowsProps {
  products: Product[]
}

const ProductRows = ({ products }: ProductRowsProps) => {
  const [user] = useAuthState(auth)

  return (
    <Table.Body>
      {products.map((product, index) => (
        <Table.Row key={index}>
          <Table.Cell className="product-row-name">{product.name}</Table.Cell>

          <Table.Cell singleLine>{product.price} грн</Table.Cell>

          <Table.Cell singleLine className='product-row-actions'>
            {
              product.count === 'Очікується'
                ? <Label color='yellow'>Очікується</Label>
                : user
                  ? <OrderActions product={product} />
                  : <Label color='green'>В наявності</Label>
            }
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  )
}


export default ProductRows
