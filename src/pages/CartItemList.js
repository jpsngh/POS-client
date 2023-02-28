import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Button } from'antd'
import DefaultLayout from '../Components/DefaultLayout'
import { addToCart, updateCart,deleteCart } from '../redux/createSlice'
import { useDispatch } from'react-redux'
const CartItemList = (props) => {
  const [exist,setExist] = useState(false)
  const dispatch = useDispatch()
const {cartItems} = useSelector(state => state)
  
  function handle(e){
    if(e==="+"){
    dispatch({
      type: updateCart,
      payload: {...props.item,quantity: props.item.quantity + 1}
    })
  }
  else if (e==="-") {
    if(props.item.quantity>1){
    dispatch({
      type: updateCart,
      payload: {...props.item,quantity: props.item.quantity-1}
    })
  }
 


 }}

 function handleDelete(){
  if(props.item){
  dispatch({
    type: deleteCart,
    payload: props.item
  });
 }
}
  return (
    <div className="cart-item-list">
       <hr></hr>
      <div className="cart-container" style={{display:"flex",flexDirection:"row",margin:"20px",gap:"20px" ,marginLeft:"5%"}}>
        <div style={{width:"90px",height:"90px",marginRight:"20%"}} > 
   <h3> {props.item.name}</h3>
   </div>
  
    <div style={{width:"100px",height:"100px",marginLeft:"20px"}} > 
   <img src={props.item.image} alt={props.item.name} style={{width:"80px",height:"80px"}} />
   </div>

   <div style={{margin:"20px"}}>
   <h4> ${props.item.price/10 * props.item.quantity} </h4>
   </div>

   <div className='btn-group' style={{display:"flex",flexDirection:"row",margin:"40px",gap:"20px" ,marginLeft:"10%"}}>
   <Button className='add' onClick={()=>handle("+")}>+</Button>
   <p style={{margin:"10px"}}> {props.item.quantity}</p>
   <Button onClick={()=>handle("-")}>-</Button>
   <Button onClick={()=>handleDelete()}>X</Button>
</div >
  </div>
  </div>
  

   
   
  
  )}
  

export default CartItemList
