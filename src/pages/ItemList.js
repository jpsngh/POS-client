import React from 'react'
import { useDispatch } from'react-redux'
import Card from 'antd/es/card/Card'
import { addToCart } from '../redux/createSlice';
import { Button } from 'antd';
const ItemList = (props) => {
 const dispatch = useDispatch();

 const handleCart = () => {
  dispatch({
    type: addToCart,
    payload: {...props.item , quantity:1}
  });
}
  return (
    <div style={{margin:"15px ",padding:"10px"}}>


<Card
    hoverable
    style={{
      width: "250px",
      height: "350px",
     margin: "5px",
     padding: "10px",
     display: "flex",
     flexDirection :"column",
      
    
    }}
    cover={<img alt="example" src={props.item.image} style={
      {height:"150px", width:"220px",margin:"0px"}}/>}
    title={props.item.name}
  
    >
         
        <h4> $ {props.item.price/10}</h4>
        <Button className='btn-add' onClick={()=>handleCart()}>Add to Cart</Button>
        
      
        
     </Card>   
           
 
    </div>
  )
    }

export default ItemList
