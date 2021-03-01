import { CSSProperties } from 'react'
import { Breadcrumb, List } from 'semantic-ui-react'
import Category from '../../models/category'

interface CategoryRowProps {
  style?: CSSProperties
  category: Category
}

const CategoryRow = ({ style, category: { names } }: CategoryRowProps) => <>
  <div className='list-item category' style={style}>
    <Breadcrumb icon='right angle' sections={names.map(name => ({ key: name, content: name }))} />
  </div>
</>

export default CategoryRow
