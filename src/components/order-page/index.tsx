import { Table, Button, Segment, Message } from 'semantic-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

import { auth, firestore } from '../../firebase-config'
import { AppState, ResetOrderAction, RESET_ORDER } from '../../store'
import ProductRows from '../products-page/product-rows'
import { OrderItem } from '../../models/order'

interface StateProps {
  items: OrderItem[]
}

interface DispatchProps {
  resetOrder: () => ResetOrderAction
}

const mapState: MapStateToProps<StateProps, object, AppState> = state => ({
  items: Object.values(state.order).filter(x => x && x.amount > 0).map(x => x!),
})

const mapDispatch: MapDispatchToPropsFunction<DispatchProps, object> = dispatch => ({
  resetOrder: () => dispatch({ type: RESET_ORDER })
})

const OrderPage = ({ items, resetOrder }: StateProps & DispatchProps) => {
  const [user, isFirebaseLoading] = useAuthState(auth)

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState<string>()

  const history = useHistory()

  if (!isFirebaseLoading && !user || items.length === 0)
    return <Redirect to='/' />

  const handleConfirmOrder = async () => {
    setIsLoading(true)

    try {
      const doc = await firestore.collection('orders').add({ uid: user.uid, date: new Date() })

      await Promise.all(items.map(({ product: { id, name }, amount }) => {
        return doc.collection('products').add({ id, name, amount })
      }))

      setError(undefined)

      resetOrder()

      history.push('/')
    } catch (e) {
      setError(e.message)
    }

    setIsLoading(false)
  }

  return (
    <Segment basic loading={isLoading || isFirebaseLoading}>
      {error && <Message error content={error} />}

      <Table unstackable compact='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Назва</Table.HeaderCell>

            <Table.HeaderCell>Ціна</Table.HeaderCell>

            <Table.HeaderCell>Замовлення</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <ProductRows products={items.map(x => x.product)} />
      </Table>

      <Button.Group fluid>
        <Button basic negative icon='arrow left' content='Назад' as={(props: any) => <Link to='/' {...props} />} />

        <Button basic positive icon='shop' content='Підтвердити замовлення' onClick={handleConfirmOrder} />
      </Button.Group>
    </Segment>
  )
}

export default connect(mapState, mapDispatch)(OrderPage)
