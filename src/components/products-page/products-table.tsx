import { memo } from 'react'
import { FixedSizeList, areEqual } from 'react-window'
import { Segment } from 'semantic-ui-react'
import AutoSizer from 'react-virtualized-auto-sizer'

import useWindowSize from '../../hooks/use-window-size'
import Category from '../../models/category'
import Product from '../../models/product'
import ListItem from '../../models/list-item'
import CategoryRow from './category-row'
import ProductRow from './product-row'

interface ProductsTableProps {
  isLoggedIn: boolean
  categories?: Category[]
  filteredProducts?: Product[]
}

const ProductsTable = ({ isLoggedIn, categories, filteredProducts }: ProductsTableProps) => {
  const windowSize = useWindowSize()

  let items: ListItem[]

  if (filteredProducts !== undefined) {
    items = filteredProducts.map(p => p.toItem())
  }
  else if (categories !== undefined) {
    items = categories.flatMap(c => {
      const items = c.products.map(p => p.toItem())

      return c.present() ? ([c.toItem()]).concat(items) : items
    })
  }
  else {
    return null
  }

  return (
    <Segment basic attached className='products'>
      <AutoSizer>{({ width, height }) =>
        <FixedSizeList
          width={width}
          height={height - 14}
          itemCount={items.length}
          itemSize={
            (isLoggedIn && windowSize.width <= 600)
             || windowSize.width <= 340
              ? 84
              : windowSize.width <= 425
                ? 71
                : windowSize.width <= 1024 ? 52 : 35
          }
          itemKey={index => items[index].value.key}
          overscanCount={5}
          className='products-border'
        >
          {memo(({ index, style }) => {
            const item = items[index]

            return item.type === 'category'
              ? <CategoryRow style={style} category={item.value} />
              : <ProductRow style={style} isLoggedIn={isLoggedIn} product={item.value} />
          }, areEqual)}
        </FixedSizeList>
      }</AutoSizer>
    </Segment>
  )
}

export default ProductsTable
