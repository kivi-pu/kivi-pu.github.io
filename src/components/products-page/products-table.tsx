import { useEffect, useState } from 'react'
import { Segment, Table, Input, Button } from 'semantic-ui-react'

import { groupBy } from '../../helpers'
import useSearch from '../../hooks/use-search'
import Category from '../../models/category'
import Product from '../../models/product'
import CategoryRows from './category-rows'
import ProductRows from './product-rows'

async function load(): Promise<Product[]> {
  const response = await fetch('https://raw.githubusercontent.com/kivi-pu/products/master/products.xml')

  const document = new DOMParser().parseFromString(await response.text(), 'text/xml')

  return Array.from(document.getElementsByTagName('product')).map(e => new Product(e))
}

interface ProductsTableProps {
  header: JSX.Element
  isFirebaseLoading: boolean
}

const ProductsTable = ({ header, isFirebaseLoading }: ProductsTableProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const [categories, setCategories] = useState<Category[]>()

  const [filteredProducts, setProducts, query, setQuery] = useSearch<Product>()

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

  return (
    <Segment basic attached loading={isLoading || isFirebaseLoading}>
      <Input fluid icon='search' iconPosition='left' value={query} onChange={e => setQuery(e.target.value)}
        action={<Button basic icon='delete' onClick={() => setQuery('')} />} />

      <Table unstackable compact='very'>
        <Table.Header>
          <Table.Row>
            {header}
          </Table.Row>
        </Table.Header>

        {
          filteredProducts === undefined
            ? categories && <CategoryRows categories={categories} />
            : <ProductRows products={filteredProducts} />
        }
      </Table>
    </Segment>
  )
}

export default ProductsTable
