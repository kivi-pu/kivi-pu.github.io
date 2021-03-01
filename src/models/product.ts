import ListItem from './list-item'

function getXMLTagContent(xml: Element, tagName: string): string {
  const elems = xml.getElementsByTagName(tagName)

  return (elems.length >= 1 && elems[0].textContent) || ''
}

class Product {
  readonly id: string
  readonly name: string
  readonly price: string
  readonly count: string
  readonly category: string

  constructor(xml: Element) {
    this.id = getXMLTagContent(xml, 'code')
    this.name = getXMLTagContent(xml, 'name')
    this.price = getXMLTagContent(xml, 'price')
    this.count = getXMLTagContent(xml, 'count')
    this.category = getXMLTagContent(xml, 'category')
  }

  toItem(): ListItem {
    return { type: 'product', value: this }
  }

  get key() {
    return this.id
  }
}

export default Product
