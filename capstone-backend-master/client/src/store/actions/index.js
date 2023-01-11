const baseURL = 'http://localhost:3001/api/v1'
//const token = '1@3456Qw-'

const responseErrorHandler = (response) => {
  if (!response.ok) {
    throw response
  }
  return response
}

const getToken = () => {
  const token = window.localStorage.getItem('token')
  return token
}

export const fetchProducts = () => (dispatch) =>
  fetch(`${baseURL}/products`)
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then((products) => {
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', products })
    })
    .catch(() =>
      dispatch({
        type: 'GET_PRODUCTS_FAILURE',
      })
    )

export const setFilter = (category) => {
  return {
    type: 'SET_FILTER',
    filter: category,
  }
}

export const clearFilter = () => {
  return {
    type: 'CLEAR_FILTER',
  }
}

export const fetchCategories = () => (dispatch) =>
  fetch(`${baseURL}/products/categories`)
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then((categories) =>
      dispatch({ type: 'GET_CATEGORIES_SUCCESS', categories })
    )
    .catch(() =>
      dispatch({
        type: 'GET_CATEGORIES_FAILURE',
      })
    )

export const fetchProductsByName = (query) => (dispatch) =>
  fetch(`${baseURL}/products?name=${query}`)
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then((products) => {
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', products })
    })
    .catch(() =>
      dispatch({
        type: 'GET_PRODUCTS_FAILURE',
      })
    )

export const fetchProductsBySort = (sortBy, direction) => (dispatch) =>
  fetch(`${baseURL}/products?sortBy=${sortBy}&direction=${direction}`)
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then((products) => {
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', products })
    })
    .catch(() =>
      dispatch({
        type: 'GET_PRODUCTS_FAILURE',
      })
    )

const getProById = async (id) => {
  let response = await fetch(`${baseURL}/products/${id}`)
  let data = await response.json()
  console.log(data)
  return data
}
export const fetchProductById = (id) => (dispatch) =>
  getProById(id)
    .then((products) => {
      console.log(products)
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', products })
    })
    .catch(() =>
      dispatch({
        type: 'GET_PRODUCTS_FAILURE',
      })
    )

export const deleteProductById = (id) => (dispatch) =>
  fetch(`${baseURL}/products/${id}`)
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then((products) => {
      dispatch({ type: 'DELETE_PRODUCTS_SUCCESS', products })
    })
    .catch(() =>
      dispatch({
        type: 'DELETE_PRODUCTS_FAILURE',
      })
    )

const doAddProduct = async (
  name,
  category,
  manufacturer,
  price,
  availableItems,
  imageURL,
  description
) => {
  let token = await getToken()
  let response = await fetch(`${baseURL}/products`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      category,
      manufacturer,
      price,
      availableItems,
      imageURL,
      description,
    }),
  })
  let data = await response.json()
  console.log(data)
  return data
}

export const addProduct =
  (
    name,
    category,
    manufacturer,
    price,
    availableItems,
    imageURL,
    description
  ) =>
  (dispatch) => {
    doAddProduct(
      name,
      category,
      manufacturer,
      price,
      availableItems,
      imageURL,
      description
    )
      .then((products) => {
        console.log(products)
        dispatch({ type: 'ADD_PRODUCT_SUCCESS', products })
      })
      .catch(() =>
        dispatch({
          type: 'ADD_PRODUCT_FAILURE',
        })
      )
  }

const doSignIn = async (email, password) => {
  let response = await fetch(`${baseURL}/auth`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  let data = await response.json()
  console.log(data)
  return data
}

export const signIn = (email, password, navigate, location) => (dispatch) =>
  doSignIn(email, password)
    .then((data) => {
      const { token, user } = data
      console.log(user)
      console.log(token)
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: 'SIGNIN_SUCCESS', user })
      const { from } = (location && location.state) || {
        from: { pathname: '/products' },
      }
      navigate(from)
    })
    .catch(() => {
      dispatch({ type: 'SIGNIN_FAILURE' })
    })

const doSignUp = async (
  firstName,
  lastName,
  email,
  password,
  contactNumber
) => {
  let response = await fetch(`${baseURL}/users`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      contactNumber,
    }),
  })
  let data = await response.json()
  console.log(data)
  return data
}

export const signUp =
  (firstName, lastName, email, password, contactNumber, navigate) =>
  (dispatch) => {
    doSignUp(firstName, lastName, email, password, contactNumber)
      .then((user) => {
        console.log(user)
        window.localStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: 'SIGNUP_SUCCESS', user })
        navigate('/products')
      })
      .catch(() => {
        dispatch({ type: 'SIGNUP_FAILURE' })
      })
  }

export const initUserState = () => {
  return {
    type: 'INIT_SUCCESS',
  }
}

export const signOut = () => {
  return {
    type: 'SIGNOUT_SUCCESS',
  }
}

export const addToCart = (products, quantity) => {
  return {
    type: 'ADD_TO_CART',
    order: products,
    quantity: quantity,
  }
}

export const addToAddress = (address) => {
  return {
    type: 'ADD_TO_ADDRESS',
    selectedAddress: address,
  }
}

const doAddAddress = async (
  name,
  contactNumber,
  street,
  city,
  state,
  landmark,
  zipCode
) => {
  let token = await getToken()
  let response = await fetch(`${baseURL}/addresses`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      contactNumber,
      street,
      city,
      state,
      landmark,
      zipCode,
    }),
  })
  let data = await response.json()
  console.log(data)
  return data
}

export const addAddress =
  (name, contactNumber, street, city, state, landmark, zipCode) => (dispatch) =>
    doAddAddress(name, contactNumber, street, city, state, landmark, zipCode)
      .then((address) => {
        console.log(address._doc)
        dispatch({ type: 'ADD_ADDRESS_SUCCESS', address: address._doc })
      })
      .catch(() => {
        dispatch({
          type: 'ADD_ADDRESS_FAILURE',
        })
      })

const doGetAddress = async () => {
  let token = await getToken()
  let response = await fetch(`${baseURL}/addresses`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  let data = await response.json()
  console.log(data)
  return data
}

export const getAddress = () => (dispatch) =>
  doGetAddress()
    .then((address) => {
      console.log(address)
      dispatch({ type: 'GET_ADDRESS_SUCCESS', address: address })
    })
    .catch(() => {
      dispatch({
        type: 'GET_ADDRESS_FAILURE',
      })
    })

const doConfirmOrder = async (product, address, quantity) => {
  let token = await getToken()
  let response = await fetch(`${baseURL}/orders`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product, address, quantity }),
  })
  let data = await response.json()
  console.log(data)
  return data
}

export const confirmOrder = (product, address, quantity) => (dispatch) => {
  doConfirmOrder(product, address, quantity)
    .then((order) => {
      console.log(order)
      dispatch({ type: 'CONFIRM_ORDER_SUCCESS', order })
    })
    .catch(() => {
      dispatch({ type: 'CONFIRM_ORDER_FAILURE' })
    })
}
