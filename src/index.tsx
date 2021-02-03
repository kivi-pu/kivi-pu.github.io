import React from 'react'
import ReactDOM from 'react-dom'
import 'fomantic-ui-css/semantic.min.css'

import ProductsList from './components/products-list'

ReactDOM.render(
  <React.StrictMode>
    <ProductsList />
  </React.StrictMode>,
  document.getElementById('root')
)
