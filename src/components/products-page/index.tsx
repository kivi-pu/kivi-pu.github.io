import { Table, Label } from 'semantic-ui-react'
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux'

import { ProductRowElement } from './product-rows'
import ProductsTable from './products-table'
import OrderActions from './order-actions'
import User from '../../models/user'
import { AppState } from '../../store'

interface StateProps {
  user: User | undefined
}

const mapState: MapStateToProps<StateProps, object, AppState> = state => ({
  user: state.user,
})

const ProductsPage = ({ user }: StateProps) => {
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

  return <ProductsTable header={header} ProductRow={ProductRow} />
}

export default connect(mapState)(ProductsPage)
