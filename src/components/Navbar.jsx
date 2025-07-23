import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useMemo} from 'react'
import {logout} from '../utils/localstorage'
import { setInitialState, setUserDetails} from '../redux/actions/userAction'
import {clearState} from '../redux/actions/cartActions'

const Navbar = ({click}) => {
  const cart = useSelector(state => state.cart)
  const { replace, push} = useHistory()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const {cartItems} = cart

  const getCartCount = () => {
    return cartItems.reduce((count, item) => Number(item.count) + count, 0)
  }

  const _handleLogout = () => {
    logout()
    dispatch(clearState())
    dispatch(setInitialState())
    replace('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>JSOM-E-COMERCE</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>

        <li>
          <Link to="/">Shop</Link>
        </li>

        {!user.userInfo.isLogin ? (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        ) : (
          <li>
            <p onClick={_handleLogout}>Logout</p>
          </li>
        )}
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Navbar
