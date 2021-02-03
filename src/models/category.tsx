import { Product } from './product'

export class Category {
  name: string
  products: Product[]

  constructor(xml: Element) {
    this.name = xml.getAttribute('name') || ''
    this.products = Array.from(xml.getElementsByTagName('product')).map(e => new Product(e))
  }
}
