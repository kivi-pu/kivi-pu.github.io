import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'fomantic-ui-css/semantic.min.css'

import ProductsPage from './components/products-page'
import SignInPage from './components/sign-in-page'
import OrderPage from './components/order-page'
import store from './store'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path='/signin' component={SignInPage} />

        <Route exact path='/order' component={OrderPage} />

        <Route exact path='/' component={ProductsPage} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
