import { useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react'

import Category from '../models/category'
import ProductsList from './products-list'

async function load(): Promise<Category[]> {
  const response = await fetch('https://raw.githubusercontent.com/kivi-pu/products/master/products.xml')

  const document = new DOMParser().parseFromString(await response.text(), 'text/xml')

  return Array.from(document.getElementsByTagName('category')).map(e => new Category(e))
}

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>()

  useEffect(() => {
    load().then(categories => setCategories(categories))
    // warning on setter functions missing from deps, that should be safe
    // eslint-disable-next-line
  }, [])

  return (
    <Segment basic>
      {categories && <ProductsList categories={categories} />}
    </Segment>
  )
}

export default ProductsPage
