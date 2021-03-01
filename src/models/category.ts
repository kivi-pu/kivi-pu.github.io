import Product from './product'
import ListItem from './list-item'

class Category {
  readonly key: string
  readonly names: string[]
  readonly products: Product[]

  constructor(name: string, products: Product[]) {
    this.key = name
    this.names = name.split('/')
    this.products = products
  }

  present() {
    return this.key !== ''
  }

  toItem(): ListItem {
    return { type: 'category', value: this }
  }
}

export default Category
