import * as actionTypes from '../constants/cartConstants'
import axios from 'axios'
import {Api} from '../../utils/Api'
import {convertToCartData} from '../../utils/utils.function'

export const addToCart = (user_id, product_id, count) => async dispatch => {
  const {data} = await Api.getRequest(`/api/products/${product_id}`)
  const product = JSON.parse(data)
  // console.log(product)
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      count,
    },
  })

  Api.postRequest('/api/cart', {user_id, product_id, count})
}

export const removeFromCart =
  ({pId, _id}) =>
  dispatch => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: pId,
    })
    Api.DeleteRequest('/api/cart/' + _id)
  }

export const fetchCart = () => async dispatch => {
  try {
    const {data: strigifyData} = await Api.getRequest(`/api/cart/`)
    // console.log({strigifyData})
    const {carts} = JSON.parse(strigifyData)
    // console.log(carts)

    dispatch({
      type: actionTypes.FETCH_MY_CART,
      payload: {
        carts: convertToCartData(carts),
      },
    })
  } catch (e) {
    console.log('EROROR :  ', e)
  }
}
