import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItemList from './CartItemList';
import DefaultLayout from '../Components/DefaultLayout';
import { Button,Select,Form,Input} from 'antd';
import {Modal} from 'antd';

import { emptyCart } from '../redux/createSlice';
const CartPage = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
const [modalText, setModalText] = useState('Edit Item');
const [subtotal,setSubtotal] = useState(0);
const [success,setSuccess] = useState(false);
const navigate = useNavigate();
const {cartItems} = useSelector(state => state);
const dispatch = useDispatch();
const handleOk = (value) => {

  console.log(value)
  console.log(subtotal)

  console.log(cartItems);
axios.post('/billing/add-bills',{
  ...value,
  "amount":subtotal,
  "items":cartItems
})
.then(function (response) {
  setSuccess(true);
  dispatch({
    type: emptyCart,
    payload: [],
  });
  navigate('/orders');
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
  
  setModalText('The modal will be closed after two seconds');
  setConfirmLoading(true);
  setTimeout(() => {
    setOpen(false);
    setConfirmLoading(false);
  }, 2000);
};
const handleCancel = () => {
  console.log('Clicked cancel button');
  setOpen(false);
};
  useEffect(() =>{
    document.title = 'Cart | Shopify';
   
setSubtotal(cartItems.reduce((acc, item) => acc + (item.price * item.quantity)/10,0));
 console.log(typeof subtotal);
  },[cartItems,subtotal])

  return (
    <DefaultLayout>

      <h2> Cart Items</h2>
      <div className='cart-page'>
     
      {console.log(cartItems)}

    {cartItems ? cartItems.map((item) =>{
   
        return <CartItemList key={item.id} item={item}/>}
     
     ):"No Items in Cart"} 
     </div>
     <div align="right">
     <h1 align="right"> Subtotal : ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity)/10,0)} </h1>
     {cartItems.length>=1? <Button  type='primary' onClick={()=>{setOpen(true)}}>Checkout</Button>:""}
     </div>
     <Modal  title="Invoice"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer ={false}>
             <Form onFinish={handleOk}  > 
           
           <Form.Item label="Customer Name" name="customer"> 
           <Input placeholder="Customer "></Input> 
           </Form.Item>    
               <Form.Item label="Contact" name="contact">  
       <Input placeholder="Contact"></Input>
       </Form.Item>
       <Form.Item label="Payment" name="payment">
       <Select >
      <Select.Option value="Cash">Cash</Select.Option>
      <Select.Option value="Credit Card">Credit Card</Select.Option>
    </Select>
       </Form.Item>
      
       <Button htmlType="submit"  loading={confirmLoading} onClick={handleOk}> Submit </Button>
       </Form>
        </Modal>

    </DefaultLayout>
       
    
  )
}

export default CartPage
