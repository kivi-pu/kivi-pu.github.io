import { Table, Label, Segment, Menu } from 'semantic-ui-react'
import { connect, MapStateToProps } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'

import { auth } from '../../firebase-config'
import { AppState } from '../../store'
import Order from '../../models/order'
import { ProductRowElement } from './product-rows'
import ProductsTable from './products-table'
import OrderActions from './order-actions'

interface StateProps {
  order: Order
}

const mapState: MapStateToProps<StateProps, object, AppState> = state => ({
  order: state.order,
})

const ProductsPage = ({ order }: StateProps) => {
  const [user, isLoading] = useAuthState(auth)

  const ProductRow: ProductRowElement = ({ product }) => <>
    <Table.Cell>{product.name}</Table.Cell>

    <Table.Cell singleLine>{product.price} грн</Table.Cell>

    <Table.Cell singleLine className='product-row-actions'>
      {
        product.count === 'Очікується'
          ? <Label color='yellow'>Очікується</Label>
          : user
            ? <OrderActions product={product} />
            : <Label color='green'>В наявності</Label>
      }
    </Table.Cell>
  </>

  const header = <>
    <Table.HeaderCell>Назва</Table.HeaderCell>

    <Table.HeaderCell>Ціна</Table.HeaderCell>

    <Table.HeaderCell>{user ? 'Замовлення' : 'Наявність'}</Table.HeaderCell>
  </>

  return <>
    {user && <Menu secondary attached>
      <Menu.Item onClick={() => auth.signOut()}>
        Вийти
      </Menu.Item>

      {Object.keys(order).length > 0 && <Menu.Menu className='right'>
        <Menu.Item as={(props: any) => <Link to='/order' {...props} />}>
          Перейти до замовлення
        </Menu.Item>
      </Menu.Menu>}
    </Menu>}

    <ProductsTable header={header} ProductRow={ProductRow} isFirebaseLoading={isLoading} />
  </>
}

export default connect(mapState)(ProductsPage)
