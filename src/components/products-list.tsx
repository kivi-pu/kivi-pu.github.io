import { useEffect, useState } from 'react'
import { Button, Input, Table, Segment } from 'semantic-ui-react'
import useSearch from '../hooks/use-search'

import Category from '../models/category'
import Product from '../models/product'
import ProductRows from './product-rows'
import CategoryRows from './category-rows'

async function load(): Promise<Category[]> {
  const response = await fetch('https://raw.githubusercontent.com/kivi-pu/products/master/products.xml')

  const document = new DOMParser().parseFromString(await response.text(), 'text/xml')

  return Array.from(document.getElementsByTagName('category')).map(e => new Category(e))
}

const ProductsList = () => {
  const [categories, setCategories] = useState<Category[]>()

  const [filteredProducts, setProducts, query, setQuery] = useSearch<Product>()

  useEffect(() => {
    load().then(categories => {
      setCategories(categories)

      setProducts(categories.map(c => c.products).flat(), { keys: ['name'] })
    })
    // warning on setter functions missing from deps, that should be safe
    // eslint-disable-next-line
  }, [])

  return (
    <Segment basic>
      <Input fluid icon='search' iconPosition='left' value={query} onChange={e => setQuery(e.target.value)}
        action={<Button basic icon='delete' onClick={() => setQuery('')} />} />

      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Назва</Table.HeaderCell>

            <Table.HeaderCell>Ціна</Table.HeaderCell>

            <Table.HeaderCell>Наявність</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {
          filteredProducts === undefined
            ? categories && <CategoryRows categories={categories} />
            : <ProductRows products={filteredProducts} />
        }
      </Table >
    </Segment>
  )
}

export default ProductsList
