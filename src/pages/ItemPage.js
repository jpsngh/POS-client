import React,{useEffect}from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import {Modal,Button,Input,Form} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import AItem from './AItem';
const ItemPage = () => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
const [modalText, setModalText] = useState('Add Item');
const [success,setSuccess] = useState(false);


  const handleOk = (e) => {
    e.preventDefault();
    
    const   name = e.target[0].value;
    const   price = e.target[1].value;
    const   category = e.target[2].value;
    const    image  = e.target[3].value;

    console.log(name,price,category,image);

axios.post('/api/items/add-item',{
  name:name,
  price:price,
  category:category,
  image:image,
  verified:true
})
.then(function (response) {
 setSuccess(" Sucessfully Added");
  console.log(response);
})
.catch(function (error) {
  console.log(error);
  setSuccess(" Failed")
});

 console.log(e);
 setModalText('Saving Data...');
 setConfirmLoading(true);
setTimeout(()=>{ 
   setOpen(false);
   setConfirmLoading(false);
   setModalText('Add Item');
   
  },3000)
      
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };
  const [data, setData] = useState();
  
    useEffect(() => {
  const fetchData = async () => {
    const result =  await axios.get("/api/items/get-item");
    setData(result.data);
    return result.data;
  };
  fetchData();
  setTimeout(() => {
    setSuccess(null);
    
  }, 5000);

    },[success]);
    
 

 
return (

 <DefaultLayout>
   {success && <div className="alert alert-success" role="alert" style={{color:"red"}}>{success}</div>}
        <Modal  title={"Add Item"}
        open={open}
        onCancel={handleCancel}
        okButtonProps= {{disabled : 'true'}}
        okText='Add'
        footer={false}
        
        confirmLoading={confirmLoading}
        >
          
                  <form style={{display:"flex",flexDirection:"column",gap:"5px"}} onSubmit={(e)=>handleOk(e)}>
                   {modalText}
               <Input placeholder={"Add Name"}></Input>
       <Input placeholder={"Add Price"}></Input>
       <Input placeholder={"Add Category"}></Input>
       <Input placeholder="Set image Url"></Input>
       

       <Button style={{display:"flex",flexDirection:"column",gap:"5px"}} htmlType="submit"> Submit</Button>


       </form>
        </Modal>

  <div className='allitems-container'  > 
    <div className='items-container' style={{display:"flex",justifyContent:"space-between",marginLeft:"10%"}}>
  <h2>Item List</h2>
  <Button className='add-items-page' htmlType="submit" onClick={()=>{
    setOpen(true);
  }}>Add Items</Button>
  
</div>

 <div className='item-page' > 
 {data && data.map((item,index) => {
  return <AItem item={item} key={index} setSuccess={setSuccess}></AItem>
 })}
   </div>
   </div>
 </DefaultLayout>


   
 
  )
}

export default ItemPage
