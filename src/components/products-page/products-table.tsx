import { Table } from 'semantic-ui-react'

import Category from '../../models/category'
import Product from '../../models/product'
import CategoryRows from './category-rows'
import ProductRows from './product-rows'

interface ProductsTableProps {
  isLoggedIn: boolean
  categories?: Category[]
  filteredProducts?: Product[]
}

const ProductsTable = ({ isLoggedIn, categories, filteredProducts }: ProductsTableProps) => {
  return (
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
  )
}

export default ProductsTable
