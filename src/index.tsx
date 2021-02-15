import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'fomantic-ui-css/semantic.min.css'

import ProductsPage from './components/products-page'
import store from './store'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductsPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
