import React,{useEffect,useState} from 'react'
import DefaultLayout from '../Components/DefaultLayout';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import {Modal} from 'antd';

const Orders = () => {
    const [open,setOpen] = useState();
    const navigate = useNavigate();
    const [bills,setBills] = useState([])
    const[bill,setBill]=useState(null);
    useEffect(() => {
        console.log(bill);
        getBills().then(data => {
            setBills(data)
        })
    },[bill])

    const invoice = (bill) => {
      setOpen(true);
     
    }
    const handleOk = () => {
        
       window.print();
    }
   function handleCancel(){
        setOpen(false);
    }

const getBills = async () => {
    const res = await axios.get('/billing/get-bills')
    console.log(res.data);
    
    return res.data
}
  return (
   
 <DefaultLayout>
    <h1> BILLS</h1>
    <div style={{display:"flex",flexDirection:"column-reverse"}}> 
{bills.map(bill => { return <div className="jp"  >
       <hr></hr>
       <div > 
     
      <div className="cart-container" style={{display:"flex",flexDirection:"row",margin:"20px",gap:"20px" ,marginLeft:"5%"}}>
        <div style={{width:"50px",height:"50px",marginRight:"20%",cursor:"pointer"}}  
        
       onClick={()=>{
       
        navigate("/customer",{state:{
            customer:bill.customer,
        contact:bill.contact,
    item:bill.items,}})
       }} >

   <h3> {bill.customer}</h3>
   </div>
  
    <div style={{width:"100px",height:"100px",marginLeft:"20px"}} > 
    <h4> ${bill.amount  } </h4>
   </div>
   <div style={{width:"100px",height:"100px",marginLeft:"20px"}} > 
    <h4> HST ${(bill.amount * 13) / 100 } </h4>
   </div>
    
    <div>  
        <h4> Total ${Math.round((bill.amount * 13) / 100 + bill.amount)} </h4>
    </div>

   <div style={{margin:"20px"}}>
   <h4> {bill.payment} </h4>
   {console.log(typeof bill.date)}
    <h5> { new Date(bill.date).toDateString()}</h5>
    <Button style={{marginRight:"5px"}} onClick={()=>{
        setBill(bill);
        invoice(bill)}}> Generate Invoice </Button>
   </div>

  
   
   </div>
   <div>
   </div>

   </div>
   </div>
   


})}
        </div>
        <Modal
        open={open}
        okText="Print"
        onCancel={handleCancel}
        onOk={handleOk}
    
        >
        <div style={{display:"flex",flexDirection:"column",width:"400px",height:"500px", alignItems:"center",background:"lightgrey",marginLeft:"30px"}}>
            <div style={{}}>
            <h3> Shwarama place </h3>
            <h4>  Name : {bill?bill.customer:""}   </h4>
            <h5> Contact : {bill?bill.contact:""}   </h5>
            <div> Items: {bill?bill.items.map((item)=>{
                return <div style={{display:"flex" ,flexDirection:"row",gap:"20px"}}> 
                     
                   <h4> {item.name} </h4>
                   <h4> x </h4>
                    <h4> {item.quantity} </h4>
                    <h4> : </h4>
                    <h4> ${item.price/10 * item.quantity} </h4>
                    
                     </div>
                   
                 
            }):""}  </div> </div>
             
             <h4> HST :$ {bill?bill.amount * 13/100:""}</h4>
                <h2> Total : $ {bill?Math.round((bill.amount * 13/100) + bill.amount):""}   </h2>
            <p> Thanks for visiting...We are happy to serve you</p>

        </div>
        </Modal>
        

        </DefaultLayout>
      
   
  )
}

export default Orders
