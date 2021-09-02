import './index.css'

import * as React from 'react'
import { render } from 'react-dom'
// eslint-disable-next-line import/named
import { createClient, Provider } from 'urql'

import App from './App'

const client = createClient({
  url: 'https://api.spacex.land/graphql/',
})

render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
