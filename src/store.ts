import { Action, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import Order from './models/order'
import Product from './models/product'
import User from './models/user'

export const UPDATE_ORDER = 'PRODUCTS_PAGE/UPDATE_ORDER'

export interface UpdateOrderAction extends Action<typeof UPDATE_ORDER> {
  product: Product
  amount: number
}

type AppAction = UpdateOrderAction

export interface AppState {
  order: Order
  user: User | undefined
}

const initialState: AppState = {
  order: {},
  user: undefined
}

const reducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case UPDATE_ORDER:
      const { product, amount } = action

      return { ...state, order: { ...state.order, [product.id]: { product, amount } } }

    default:
      return state
  }
}

export default createStore(reducer, devToolsEnhancer({}))
