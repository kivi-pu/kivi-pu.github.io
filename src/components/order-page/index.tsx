import { Table, Button, Segment, Message } from 'semantic-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

import { auth, firestore } from '../../firebase-config'
import { AppState, ResetOrderAction, RESET_ORDER } from '../../store'
import ProductRow from '../products-page/product-row'
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
      const products = items.map(({ product: { id, name }, amount }) => JSON.stringify({ id, name, amount }))

      await firestore.collection('orders').add({ uid: user.uid, date: new Date(), products })

      setError(undefined)

      resetOrder()

      history.push('/')
    } catch (e) {
      setError(e.message)
    }

    setIsLoading(false)
  }

  if (isLoading || isFirebaseLoading)
    return <Segment basic attached loading />

  return <>
    {error && <Segment basic attached><Message error content={error} /></Segment>}

    <Segment basic attached>
      <div className='list-header'>
        <div>Назва</div>

        <div>Ціна</div>

        <div>Замовлення</div>
      </div>
    </Segment>

    <Segment basic attached className='order-products'>
      <div>{items.map(({ product }) => <ProductRow key={product.id} product={product} isLoggedIn />)}</div>
    </Segment>

    <Segment basic attached className='order-buttons'>
      <Button.Group fluid>
        <Button basic negative icon='arrow left' content='Назад' as={(props: any) => <Link to='/' {...props} />} />

        <Button basic positive icon='shop' content='Підтвердити замовлення' onClick={handleConfirmOrder} />
      </Button.Group>
    </Segment>
  </>
}

export default connect(mapState, mapDispatch)(OrderPage)
