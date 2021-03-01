import { useEffect, useState } from 'react'
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Segment } from 'semantic-ui-react'
import Fuse from 'fuse.js'

import { AppState, SetDataAction, SET_DATA } from '../../store'
import { auth } from '../../firebase-config'
import useSearch from '../../hooks/use-search'
import Category from '../../models/category'
import Product from '../../models/product'
import Order from '../../models/order'
import ProductsSearchInput from './products-search-input'
import ProductsTable from './products-table'
import Menu from './menu'

async function load(): Promise<Product[]> {
  const response = await fetch('https://raw.githubusercontent.com/kivi-pu/products/master/products.xml')

  const document = new DOMParser().parseFromString(await response.text(), 'text/xml')

  return Array.from(document.getElementsByTagName('product')).map(e => new Product(e))
}

interface StateProps {
  order: Order
  fuse?: Fuse<Product>
  categories?: Category[]
}

interface DispatchProps {
  setData: (products: Product[]) => SetDataAction
}

const mapState: MapStateToProps<StateProps, object, AppState> = state => state

const mapDispatch: MapDispatchToPropsFunction<DispatchProps, object> = dispatch => ({
  setData: products => dispatch({ type: SET_DATA, products })
})

const ProductsPage = ({ order, fuse, categories, setData }: StateProps & DispatchProps) => {
  const [user, isFirebaseLoading] = useAuthState(auth)

  const [isDataLoading, setIsDataLoading] = useState(false)

  const [filteredProducts, runQuery] = useSearch<Product>(fuse)

  useEffect(() => {
    if (!categories || !fuse) {
      setIsDataLoading(true)

      load().then(products => { setData(products); setIsDataLoading(false) })
    }
    // warning on setter functions missing from deps, that should be safe
    // eslint-disable-next-line
  }, [])

  if (isDataLoading || isFirebaseLoading)
    return <Segment basic attached loading />

  return <>
    <Menu isLoggedIn={!!user} hasOrder={Object.values(order).filter(x => x && x.amount > 0).length > 0} />

    <Segment basic attached>
      <ProductsSearchInput onSearch={runQuery} />
    </Segment>

    <Segment basic attached>
      <div className='list-header'>
        <div>Назва</div>

        <div>Ціна</div>

        <div>{user ? 'Замовлення' : 'Наявність'}</div>
      </div>
    </Segment>

    <ProductsTable isLoggedIn={!!user} categories={categories} filteredProducts={filteredProducts} />
  </>
}

export default connect(mapState, mapDispatch)(ProductsPage)
