import Category from './category'
import Product from './product'

type ListItem = { type: 'category', value: Category } | { type: 'product', value: Product }

export default ListItem
