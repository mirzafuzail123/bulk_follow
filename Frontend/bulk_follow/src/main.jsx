import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import Router from './Router/Router'
import GlobalStateContextProvider from '../src/Context/GlobalStateContextProvider'
import BackendContextProvider from '../src/Context/BackendContextProvider'
import AdminContextProvider from './Admin/Context/AdminContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(

  <GlobalStateContextProvider>
    <BackendContextProvider>
      <AdminContextProvider>

        <Router />

      </AdminContextProvider>
    </BackendContextProvider>
  </GlobalStateContextProvider>
)
