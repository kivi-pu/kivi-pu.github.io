import { useEffect, useState } from 'react'
import { Segment, Table } from 'semantic-ui-react'

import { groupBy } from '../../helpers'
import useSearch from '../../hooks/use-search'
import Category from '../../models/category'
import Product from '../../models/product'
import CategoryRows from './category-rows'
import ProductRows from './product-rows'
import ProductsSearchInput from './products-search-input'

async function load(): Promise<Product[]> {
  const response = await fetch('https://raw.githubusercontent.com/kivi-pu/products/master/products.xml')

  const document = new DOMParser().parseFromString(await response.text(), 'text/xml')

  return Array.from(document.getElementsByTagName('product')).map(e => new Product(e))
}

interface ProductsTableProps {
  isFirebaseLoading: boolean
  isLoggedIn: boolean
}

const ProductsTable = ({ isFirebaseLoading, isLoggedIn }: ProductsTableProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const [categories, setCategories] = useState<Category[]>()

  const [filteredProducts, setProducts, runQuery] = useSearch<Product>()

  useEffect(() => {
    load().then(products => {
      const categories = groupBy(products, p => p.category)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, products]) => new Category(name, products))

      setCategories(categories)

      setProducts(products.sort((a, b) => a.name.localeCompare(b.name)), { keys: ['name'] })

      setIsLoading(false)
    })
    // warning on setter functions missing from deps, that should be safe
    // eslint-disable-next-line
  }, [])

  if (isLoading || isFirebaseLoading)
    return <Segment basic attached loading className='products-table-segment' />

  return (
    <Segment basic attached className='products-table-segment'>
      <ProductsSearchInput onSearch={runQuery} />

      <Table unstackable compact='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Назва</Table.HeaderCell>

            <Table.HeaderCell>Ціна</Table.HeaderCell>

            <Table.HeaderCell>{isLoggedIn ? 'Замовлення' : 'Наявність'}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {
          filteredProducts === undefined
            ? categories && <CategoryRows categories={categories} isLoggedIn={isLoggedIn} />
            : <ProductRows products={filteredProducts} isLoggedIn={isLoggedIn} />
        }
      </Table>
    </Segment>
  )
}

export default ProductsTable
