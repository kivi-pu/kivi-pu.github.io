import Product from './product'

export interface OrderItem {
  product: Product
  amount: number
}

interface Order {
  [key: string]: OrderItem | undefined
}

export default Order
