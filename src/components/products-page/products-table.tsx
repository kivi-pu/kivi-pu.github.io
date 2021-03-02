import { memo, useEffect, useMemo, useState } from 'react'
import { FixedSizeList, areEqual } from 'react-window'
import { Segment } from 'semantic-ui-react'

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

interface MemoisedListProps {
  height: number
  windowWidth: number
  isLoggedIn: boolean
  items: ListItem[]
}

const MemoisedList = memo(({ height, windowWidth, isLoggedIn, items }: MemoisedListProps) => (
  <FixedSizeList
    width='100%'
    height={height}
    itemCount={items.length}
    itemSize={
      (isLoggedIn && windowWidth <= 600)
        || windowWidth <= 340
        ? 84
        : windowWidth <= 425
          ? 71
          : windowWidth <= 1024 ? 52 : 35
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
))

const ProductsTable = ({ isLoggedIn, categories, filteredProducts }: ProductsTableProps) => {
  const windowSize = useWindowSize()

  const [maxHeight, setMaxHeight] = useState<number>(windowSize.height)

  useEffect(() => { if (windowSize.height > maxHeight) setMaxHeight(windowSize.height) }, [windowSize.height])

  const items = useMemo(() => {
    if (filteredProducts !== undefined) {
      return filteredProducts.map(p => p.toItem())
    }
    else if (categories !== undefined) {
      return categories.flatMap(c => {
        const items = c.products.map(p => p.toItem())

        return c.present() ? ([c.toItem()]).concat(items) : items
      })
    }
    else {
      return []
    }
  }, [categories, filteredProducts])

  return (
    <Segment basic attached className='products'>
      <MemoisedList
        height={maxHeight - (isLoggedIn ? 155 : 115) - (windowSize.width > 425 ? 14 : 0)}
        windowWidth={windowSize.width}
        items={items}
        isLoggedIn={isLoggedIn}
      />
    </Segment>
  )
}

export default ProductsTable
