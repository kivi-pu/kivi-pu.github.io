import { Action, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import Fuse from 'fuse.js'

import { groupBy } from './helpers'
import Order from './models/order'
import Product from './models/product'
import Category from './models/category'

export const UPDATE_ORDER = 'UPDATE_ORDER'

export interface UpdateOrderAction extends Action<typeof UPDATE_ORDER> {
  product: Product
  amount: number
}

export const RESET_ORDER = 'RESET_ORDER'

export interface ResetOrderAction extends Action<typeof RESET_ORDER> {}

export const SET_DATA = 'SET_DATA'

export interface SetDataAction extends Action<typeof SET_DATA> {
  products: Product[]
}

type AppAction = UpdateOrderAction | ResetOrderAction | SetDataAction

export interface AppState {
  order: Order
  fuse?: Fuse<Product>
  categories?: Category[]
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

    case SET_DATA:
      const fuse = new Fuse(action.products, { keys: ['name'] })

      const categories = groupBy(action.products, p => p.category)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, products]) => new Category(name, products))

      return { ...state, fuse, categories }

    default:
      return state
  }
}

export default createStore(reducer, devToolsEnhancer({}))
