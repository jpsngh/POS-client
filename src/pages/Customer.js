import React,{useEffect,useState} from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { useLocation } from 'react-router-dom'
import { Button } from 'antd'
import { addToCart } from '../redux/createSlice'
import { useDispatch } from 'react-redux'
const Customer = (props) => {
    const dispatch = useDispatch()
    const {state} = useLocation()
    console.log(state)
   const [data,setData] = useState({
    item1:{},
    item2:{},
    
   })

    useEffect(() => {
      setData("");
    },[data])



    const handleCart = (item) => {
      
        dispatch({
            type: addToCart,
            payload: {...item, quantity: item.quantity}
          });
      }
  return (
  


    <DefaultLayout>
   <div style={{display:"flex",flexDirection:"row",margin:"20px",gap:"2rem",justifyContent:"space-between"}}>
 
  <div>
    <h1>{state?state.customer:""}</h1>
  </div>
  <div>
    <h1>{state?state.contact:""}</h1>
  </div>

  <div style={{margin:"10px"}}>

  </div>
    <div>{state ?state.item.map((item)=>{
        return < div style={{display:"flex",justifyContent:"space-between" ,gap:"50px",margin:"50px"}}>
            <div> 
             <h1>{item.name}</h1>
             </div>
           
            <h1>${item.price/10 * item.quantity}</h1>
            
            <img style={{width:"50px"}} src={item.image}/>
            <Button onClick={()=>handleCart(item)}>Add Last Order </Button>    
           
        </div>
               
    }):""}
               
    </div>
    </div>
   
     
    </DefaultLayout>
  )
}

export default Customer
