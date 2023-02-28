 import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartSlice,updateCart,deleteCart,emptyCart} from './createSlice'

const store = configureStore( cartSlice,updateCart,deleteCart,emptyCart, composeWithDevTools())

export default store