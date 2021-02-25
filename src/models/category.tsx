import Product from './product'

class Category {
  names: string[]
  products: Product[]

  constructor(name: string, products: Product[]) {
    this.names = name.split('/')
    this.products = products
  }

  present() {
    return !(this.names.length === 1 && this.names[0] === '')
  }
}

export default Category
