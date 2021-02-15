import { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux'

import { AppState, UpdateOrderAction, UPDATE_ORDER } from '../../store'
import Product from '../../models/product'

interface OwnProps {
  product: Product
}

interface StateProps {
  amount: number
}

interface DispatchProps {
  setOrderAmount: (amount: number) => UpdateOrderAction
}

const mapState: MapStateToProps<StateProps, OwnProps, AppState> = (state, props) => ({
  amount: state.order[props.product.id]?.amount || 0,
})

const mapDispatch: MapDispatchToPropsFunction<DispatchProps, OwnProps> = (dispatch, props) => ({
  setOrderAmount: amount => dispatch({ type: UPDATE_ORDER, product: props.product, amount })
})

const OrderActions = ({ amount, setOrderAmount }: OwnProps & StateProps & DispatchProps) => {
  console.log('render OrderActions', amount)

  const [value, setValue] = useState<string>()

  if (amount === 0 && value === undefined)
    return <Button size='mini' compact basic icon='add' onClick={() => setOrderAmount(1)} />

  return <>
    <Button size='mini' compact basic icon='plus' onClick={() => setOrderAmount(amount + 1)} />

    <Input size='mini' value={value === undefined ? amount : value}
      onChange={e => { console.log('change'); setValue(e.target.value) }}
      onBlur={() => {
        if (value === undefined)
          return

        setOrderAmount(parseInt(value) || 0)

        setValue(undefined)
      }}
    />

    <Button size='mini' compact basic icon='minus' onClick={() => setOrderAmount(amount - 1)} />
  </>
}

export default connect(mapState, mapDispatch)(OrderActions)
