import { useEffect, useState } from 'react'
import { Segment, Table } from 'semantic-ui-react'
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux'
import Fuse from 'fuse.js'

import { AppState, SetDataAction, SET_DATA } from '../../store'
import useSearch from '../../hooks/use-search'
import Category from '../../models/category'
import Product from '../../models/product'
import CategoryRows from './category-rows'
import ProductRows from './product-rows'
import ProductsSearchInput from './products-search-input'

async function load(): Promise<Product[]> {
  const response = await fetch('https://raw.githubusercontent.com/kivi-pu/products/master/products.xml')

  const document = new DOMParser().parseFromString(await response.text(), 'text/xml')

  return Array.from(document.getElementsByTagName('product')).map(e => new Product(e))
}

interface OwnProps {
  isFirebaseLoading: boolean
  isLoggedIn: boolean
}

interface StateProps {
  fuse?: Fuse<Product>
  categories?: Category[]
}

interface DispatchProps {
  setData: (products: Product[]) => SetDataAction
}

const mapState: MapStateToProps<StateProps, OwnProps, AppState> = state => state

const mapDispatch: MapDispatchToPropsFunction<DispatchProps, OwnProps> = dispatch => ({
  setData: products => dispatch({ type: SET_DATA, products })
})

const ProductsTable = (
  {
    isFirebaseLoading,
    isLoggedIn,
    fuse,
    categories,
    setData
  }: OwnProps & StateProps & DispatchProps
) => {
  const [isLoading, setIsLoading] = useState(false)

  const [filteredProducts, runQuery] = useSearch<Product>(fuse)

  useEffect(() => {
    if (!categories || !fuse) {
      setIsLoading(true)

      load().then(products => { setData(products); setIsLoading(false) })
    }
    // warning on setter functions missing from deps, that should be safe
    // eslint-disable-next-line
  }, [])

  if (isLoading || isFirebaseLoading)
    return <Segment basic attached loading className='products-table-segment' />

  return (
    <Segment basic attached className='products-table-segment'>
      <ProductsSearchInput onSearch={runQuery} />

      <Table unstackable compact='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Назва</Table.HeaderCell>

            <Table.HeaderCell>Ціна</Table.HeaderCell>

            <Table.HeaderCell>{isLoggedIn ? 'Замовлення' : 'Наявність'}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {
          filteredProducts === undefined
            ? categories && <CategoryRows categories={categories} isLoggedIn={isLoggedIn} />
            : <ProductRows products={filteredProducts} isLoggedIn={isLoggedIn} />
        }
      </Table>
    </Segment>
  )
}

export default connect(mapState, mapDispatch)(ProductsTable)
