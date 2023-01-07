const baseURL = 'http://localhost:3001/api/v1'

const responseErrorHandler = (response) => {
  if (!response.ok) {
    throw response
  }
  return response
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

export const fetchProductById = (id) => (dispatch) =>
  fetch(`${baseURL}/products/${id}`)
    .then(responseErrorHandler)
    .then((res) => {
      res.json()
    })
    .then((products) => {
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

export const signIn = (email, password, history, location) => (dispatch) =>
  fetch(`${baseURL}/auth`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then((user) => {
      dispatch({ type: 'SIGNIN_SUCCESS', user })
      const { from } = (location && location.state) || {
        from: { pathname: '/' },
      }
      history.replace(from)
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
  (firstName, lastName, email, password, contactNumber) => (dispatch) => {
    doSignUp(firstName, lastName, email, password, contactNumber)
      .then((user) => {
        console.log(user)
        dispatch({ type: 'SIGNUP_SUCCESS', user })
      })
      .catch(() => {
        dispatch({ type: 'SIGNUP_FAILURE' })
      })
  }
