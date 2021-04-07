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

async function getUpdatedAt(): Promise<Date> {
  const response = await fetch('https://api.github.com/repos/kivi-pu/products/commits?per_page=1')

  const json = await response.json()

  return new Date(json[0].commit.author.date)
}

interface StateProps {
  order: Order
  fuse?: Fuse<Product>
  categories?: Category[]
  updatedAt?: Date
}

interface DispatchProps {
  setData: (products: Product[], updatedAt: Date) => SetDataAction
}

const mapState: MapStateToProps<StateProps, object, AppState> = state => state

const mapDispatch: MapDispatchToPropsFunction<DispatchProps, object> = dispatch => ({
  setData: (products, updatedAt) => dispatch({ type: SET_DATA, products, updatedAt })
})

const ProductsPage = ({ order, fuse, categories, updatedAt, setData }: StateProps & DispatchProps) => {
  const [user, isFirebaseLoading] = useAuthState(auth)

  const [isDataLoading, setIsDataLoading] = useState(false)

  const [filteredProducts, runQuery] = useSearch<Product>(fuse)

  useEffect(() => {
    if (!categories || !fuse || !updatedAt) {
      setIsDataLoading(true)

      Promise.all([load(), getUpdatedAt()])
        .then(([products, updatedAt]) => { setData(products, updatedAt); setIsDataLoading(false) })
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
      {updatedAt && <div className='updated-at-notice'>
        Оновлено {updatedAt.toLocaleDateString()} о {updatedAt.toLocaleTimeString()}
      </div>}

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
