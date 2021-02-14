import { Fragment } from 'react'
import { Breadcrumb, Table } from 'semantic-ui-react'
import { Category } from '../models/category'
import ProductRows from './product-rows'

interface CategoryRowsParams {
  categories: Category[]
}

interface CategoryNameParams {
  names: string[]
}

const CategoryRows = ({ categories }: CategoryRowsParams) => <>
  {categories.map(({ names, products }, index) => (
    <Fragment key={index}>
      {names && <CategoryHeader names={names} />}

      <ProductRows products={products} />
    </Fragment>
  ))}
</>

const CategoryHeader = ({ names }: CategoryNameParams) => <Table.Header>
  <Table.Row>
    <Table.HeaderCell colSpan={3}>
      <Breadcrumb icon='right angle' sections={names.map(name => ({ key: name, content: name }))} />
    </Table.HeaderCell>
  </Table.Row>
</Table.Header>

export default CategoryRows
