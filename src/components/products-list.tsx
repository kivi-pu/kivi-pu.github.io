import { useEffect } from 'react'
import { Button, Input, Table, Segment, Label } from 'semantic-ui-react'
import useSearch from '../hooks/use-search'

import Product from '../models/product'
import ProductRows from './product-rows'
import CategoryRows from './category-rows'
import Category from '../models/category'

interface ProductsListProps {
  categories: Category[]
}

const ProductsList = ({ categories }: ProductsListProps) => {
  const [filteredProducts, setProducts, query, setQuery] = useSearch<Product>()

  useEffect(() => {
    setProducts(categories.map(c => c.products).flat(), { keys: ['name'] })
    // warning on setter functions missing from deps, that should be safe
    // eslint-disable-next-line
  }, [categories])

  return (
    <Segment basic>
      <Input fluid icon='search' iconPosition='left' value={query} onChange={e => setQuery(e.target.value)}
        action={<Button basic icon='delete' onClick={() => setQuery('')} />} />

      <Table unstackable compact='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Назва</Table.HeaderCell>

            <Table.HeaderCell>Ціна</Table.HeaderCell>

            <Table.HeaderCell>Замовлення</Table.HeaderCell>
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

export default ProductsList
