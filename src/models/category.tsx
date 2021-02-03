import { Product } from './product'

export class Category {
  names: string[] | undefined
  products: Product[]

  constructor(xml: Element) {
    this.names = xml.getAttribute('name')?.split('/')
    this.products = Array.from(xml.getElementsByTagName('product')).map(e => new Product(e))
  }
}
