import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Modal,Form,Button,Input } from 'antd'

const AItem = (props) => {
  const {setSuccess} = props
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Edit Item');
  const [done,setDone] = useState("")

    useEffect(() => {
      setDone("")
    },[done])


    const handleOk = async (value) => {
      console.log(value);
      console.log(props.item._id);
      if (value ==="x"){
        axios.delete("/api/items/delete-item", {data:{itemId: props.item._id}}).then(function (response) {
          console.log(response)
        setSuccess("Item Deleted");
        }).catch(err=>console.log(err));
          return true;
      }

      axios.put("/api/items/update-item",{
        
        ...value,
        itemId:props.item._id
        
      }).then(function (response) {
        console.log(response)
       setSuccess(" Item Successfully Updated");
      }).catch(err=>console.log(err.message));

      
      setModalText('Updating....');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
        setModalText('Updating....');
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
  return (
    
   
    <div className='a-item'style={{}}>
        <Modal  title={`Edit ${props.item.name}`}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer ={false}>
             <Form onFinish={handleOk} initialValues={props.item} > 
           
           <Form.Item label="Name" name="name"> 
           <Input placeholder={props.item.name}></Input> 
           </Form.Item>    
               <Form.Item label="Price" name="price">  
       <Input placeholder={props.item.price}></Input>
       </Form.Item>
       <Form.Item label="Category" name="category">
       <Input placeholder={props.item.category}></Input>
       </Form.Item>
       <Form.Item label="Image" name="image"> 
       <Input placeholder="Set image Url"></Input>
       </Form.Item>
       <Button htmlType="submit"  loading={confirmLoading} onClick={handleOk}> Submit </Button>
       </Form>
        </Modal>
        <hr></hr>
      <div className="cart-container" style={{display:"flex",flexDirection:"row",margin:"20px",gap:"20px" ,marginLeft:"5%"}}>
        <div style={{width:"90px",height:"90px",marginRight:"20%"}} > 
   <h3> {props.item.name}</h3>
   </div>
  
    <div style={{width:"100px",height:"100px",marginLeft:"20px"}} > 
   <img src={props.item.image} alt={props.item.name} style={{width:"80px",height:"80px"}} />
   </div>


   
   <h4 style={{margin:"20%,"}}> ${props.item.price/10} </h4>
   <div className='btn-group' style={{display:"flex",flexDirection:"row",margin:"40px",gap:"20px" ,marginLeft:"10%"}}>

   <p> {props.item.quantity}</p>
   <Button onClick={()=>{
      setOpen(true);
   }} >Edit</Button>
   <Button  onClick={()=>handleOk("x")}>Delete</Button>
   </div>
   
  </div>
    </div>
    
  
   
  )
}

export default AItem
