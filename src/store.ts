import { Action, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import Order from './models/order'
import Product from './models/product'

export const UPDATE_ORDER = 'UPDATE_ORDER'

export interface UpdateOrderAction extends Action<typeof UPDATE_ORDER> {
  product: Product
  amount: number
}

export const RESET_ORDER = 'RESET_ORDER'

export interface ResetOrderAction extends Action<typeof RESET_ORDER> {}

type AppAction = UpdateOrderAction | ResetOrderAction

export interface AppState {
  order: Order
}

const initialState: AppState = {
  order: {},
}

const reducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case UPDATE_ORDER:
      const { product, amount } = action as UpdateOrderAction

      return { ...state, order: { ...state.order, [product.id]: { product, amount } } }

    case RESET_ORDER:
      return { ...state, order: {} }

    default:
      return state
  }
}

export default createStore(reducer, devToolsEnhancer({}))
