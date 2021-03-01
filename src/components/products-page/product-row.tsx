import { CSSProperties } from 'react'
import { Label, Icon } from 'semantic-ui-react'

import useWindowSize from '../../hooks/use-window-size'
import Product from '../../models/product'
import OrderActions from './order-actions'

interface ProductRowProps {
  style?: CSSProperties
  product: Product
  isLoggedIn: boolean
}

const ProductRow = ({ style, product, isLoggedIn }: ProductRowProps) => {
  const { width } = useWindowSize()

  return (
    <div className='list-item product' style={style}>
      <div className="product-row-name">{product.name}</div>

      <div>{product.price} грн</div>

      <div className='product-row-actions'>
        {
          product.count === 'Очікується'
            ? <Label color='yellow'>{width > 600 ? 'Очікується' : <Icon name='clock' />}</Label>
            : isLoggedIn
              ? <OrderActions product={product} />
              : <Label color='green'>{width > 600 ? 'В наявності' : <Icon name='check' />}</Label>
        }
      </div>
    </div>
  )
}

export default ProductRow
