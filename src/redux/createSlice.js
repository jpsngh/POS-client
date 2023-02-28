import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    loading: false,
    cartItems:  [],
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state=initialState, action) => {
       if(state.cartItems.find(item => item.name === action.payload.name)){
       return { ...state,
         cartItems : state.cartItems.map(item => item.name === action.payload.name? 
            {...item, quantity: item.quantity + action.payload.quantity} : item)
        } }
      else{
        return {
          ...state,
            cartItems: [...state.cartItems, action.payload],
      }
        }},
             
               
     
                
 updateCart: (state=initialState, action) => {
    
            return { ...state,
        cartItems: state.cartItems.map(item => item.name === action.payload.name? 
            {...item, quantity: action.payload.quantity} : item),
    }}
   

, deleteCart: (state=initialState, action) => {

  return { ...state,
    cartItems : state.cartItems.filter(item => item.name !== action.payload.name)
     
   } },
   emptyCart: (state=initialState, action) => {
    return {
      ...state,
        cartItems: [],
    }}
  
}});

export const {addToCart,updateCart,deleteCart,emptyCart} = cartSlice.actions;

export default cartSlice.reducer;
