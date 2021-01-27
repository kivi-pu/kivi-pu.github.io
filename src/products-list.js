import { useEffect, useState } from 'react'
import { Input, Table, Segment } from 'semantic-ui-react'
import Fuse from 'fuse.js'

function extractProperty(xml, name) {
  const elems = xml.getElementsByTagName(name)

  return elems.length >= 1 ? elems[0].textContent : undefined
}

async function loadProducts() {
  const response = await fetch('products.xml')

  const document = new DOMParser().parseFromString(await response.text(), 'text/xml')

  return Array.from(document.getElementsByTagName('product')).map(product => ({
    name: extractProperty(product, 'name'),
    price: extractProperty(product, 'price'),
    count: extractProperty(product, 'count'),
  }))
}

function ProductsList() {
  const [products, setProducts] = useState({ collection: [], fuse: null })

  const [query, setQuery] = useState()

  useEffect(() => loadProducts().then(p => setProducts({ collection: p, fuse: new Fuse(p, { keys: ['name'] }) })), [])

  const productResults = (products.fuse && query) ? products.fuse.search(query).map(r => r.item) : products.collection

  return (
    <Segment basic>
      <Input fluid icon='search' onChange={e => setQuery(e.target.value)} />

      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Назва</Table.HeaderCell>

            <Table.HeaderCell>Ціна</Table.HeaderCell>

            <Table.HeaderCell>Наявність</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            productResults && productResults.map(({ name, price, count }, index) => (
              <Table.Row key={index}>
                <Table.Cell>{name}</Table.Cell>

                <Table.Cell>{price} грн</Table.Cell>

                <Table.Cell>{count}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table >
    </Segment>
  )
}

export default ProductsList
