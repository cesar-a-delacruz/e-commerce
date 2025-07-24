import * as actionTypes from '../constants/cartConstants'
import {Api} from '../../utils/Api'
import {convertToCartData} from '../../utils/utils.function'
import { getUser } from '../../utils/localstorage'

export const addToCart = ( product_id, count) => async dispatch => {
  const {data} = await Api.getRequest(`/api/products/${product_id}`)
  const product = JSON.parse(data)
  const insert_id = (await Api.postRequest('/api/cart', {user_id: getUser().id, product_id, count})).data
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      id: insert_id,
      count,
    },
  })

}
export const countEdit = ( id, count) => async dispatch => {
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: { id,count,},
  })

  await Api.putRequest('/api/cart', {id, count})
}

export const removeFromCart =
  (id) =>
  dispatch => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: id,
    })
    Api.DeleteRequest('/api/cart/' + id)
  }

export const fetchCart = () => async dispatch => {
  try {
    const user = getUser()
    if (user) {
      const {data} = await Api.postRequest(`/api/carts`, {user_id: user.id})
      const carts = JSON.parse(data)
      dispatch({
        type: actionTypes.FETCH_MY_CART,
        payload: {
          carts: convertToCartData(carts),
        },
      })
    }
  } catch (e) {
    console.log('EROROR :  ', e)
  }
}
export const clearState =
  () =>
  dispatch => {
    dispatch({
      type: actionTypes.CLEAR_STATE,
      payload: {
        carts: []
      },
    })
  }
