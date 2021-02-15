import { Action, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import Order from './models/order'
import Product from './models/product'

export const UPDATE_ORDER = 'PRODUCTS_PAGE/UPDATE_ORDER'

export interface UpdateOrderAction extends Action<typeof UPDATE_ORDER> {
  product: Product
  amount: number
}

type AppAction = UpdateOrderAction

export interface AppState {
  order: Order
}

const initialState: AppState = {
  order: {},
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
