function getXMLTagContent(xml: Element, tagName: string): string {
  const elems = xml.getElementsByTagName(tagName)

  return (elems.length >= 1 && elems[0].textContent) || ''
}

class Product {
  id: string
  name: string
  price: string
  count: string
  category: string

  constructor(xml: Element) {
    this.id = getXMLTagContent(xml, 'code')
    this.name = getXMLTagContent(xml, 'name')
    this.price = getXMLTagContent(xml, 'price')
    this.count = getXMLTagContent(xml, 'count')
    this.category = getXMLTagContent(xml, 'category')
  }
}

export default Product
