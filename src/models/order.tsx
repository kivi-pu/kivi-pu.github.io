import Product from './product'

interface OrderItem {
  product: Product
  amount: number
}

interface Order {
  [key: string]: OrderItem | undefined
}

export default Order
