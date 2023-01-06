import React from 'react'
import './common/home.css'
import NavBar from './components/navbar/NavBar'
import Nomatch from './components/nomatch/NoMatch'
import Login from './components/login/Login'
import Signup from './components/signup/SignUp'
import Product from './components/product/Product'
import ProductDetail from './components/productDetail/ProductDetail'
import ProductList from './components/productList/ProductList'
import CreateOrder from './components/createOrder/CreateOrder'
import ModifyProduct from './components/modifyProduct/ModifyProduct'
import AddProduct from './components/addProduct/AddProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/createorder' element={<CreateOrder />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/modifyProduct' element={<ModifyProduct />} />
          <Route path='*' element={<Nomatch />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App