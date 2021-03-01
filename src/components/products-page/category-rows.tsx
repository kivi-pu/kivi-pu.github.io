import { Fragment } from 'react'
import { Breadcrumb, Table } from 'semantic-ui-react'
import Category from '../../models/category'
import ProductRows from './product-rows'

interface CategoryRowsProps {
  categories: Category[]
  isLoggedIn: boolean
}

interface CategoryHeaderProps {
  names: string[]
}

const CategoryRows = ({ categories, isLoggedIn }: CategoryRowsProps) => <>
  {categories.map((category, index) => (
    <Fragment key={index}>
      {category.present() && <CategoryHeader names={category.names} />}

      <ProductRows products={category.products} isLoggedIn={isLoggedIn} />
    </Fragment>
  ))}
</>

const CategoryHeader = ({ names }: CategoryHeaderProps) => <Table.Header>
  <Table.Row>
    <Table.HeaderCell colSpan={3}>
      <Breadcrumb icon='right angle' sections={names.map(name => ({ key: name, content: name }))} />
    </Table.HeaderCell>
  </Table.Row>
</Table.Header>

export default CategoryRows
