import { Col, Row } from 'antd';
import React,{useEffect,useState}from 'react'
import "../styles/home.css"
import DefaultLayout from '../Components/DefaultLayout.js'
import {Card} from 'antd';
import axios from 'axios'

import ItemList from './ItemList';

const Homepage = () => {
  const [store,setStore] = useState();
  const [itemsData,setItemsData] = useState([]);
  const [categoryData,setCategoryData] = useState("Shawarma");
  const categories = [{
    name:"Drinks",
    image : "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1557&q=80"
  },
{
  name:"Shawarma",
  image : "https://media.istockphoto.com/id/596382080/photo/burrito-with-grilled-chicken-and-vegetables.jpg?s=612x612&w=0&k=20&c=Yyz12whuehrCJYrzR-gx-90Zp-ip60b5kmGO7gDII1A="
},{
  name:"Bowl",
  image : "https://marsfoodservices.com/media/styles/webp/public/2022-06/chicken-shawarma-bowl%20%281%29.jpg.webp?VersionId=x7uMpWPEMgLptmltzdKgmTJUmFdOecYh&itok=p6J2oFxT"
},{
  name:"Sauce",
  image : "https://cdn.tasteatlas.com/images/recipes/686bbdfb4b1b478a893cbec60cd42d61.jpg"
}]
  useEffect(()=>{
 

    const getAllItems =async()=>{
    
      try {
        const  data = await axios.get("/api/items/get-item");
        setItemsData(data.data);
        console.log(data.data);
        return data.data
       
        
      } catch (error) {
        console.log(error.message)
        
      }
    
    }
  getAllItems();
  },[store]);

  return (
    <div className='main'>
      {console.log(itemsData)}
      <DefaultLayout>
   
  <div className='category-container' style={{display:"flex",justifyContent:"space-evenly"}}>
   { categories.map((key)=>{
    return( 

   
        
      <div key={key.name} className={`category ${categoryData === key.name && `category-active`} `} 
       onClick={()=>{
        setCategoryData(key.name);
       }}>
        <img src={key.image} alt='' style={{width:"100px" ,height:"80px",borderRadius:"20px"}} />
        <h2>{key.name}</h2>
      </div>
      
      
      

   )  })} 
  </div>

    
    <Row>
  { itemsData.filter((item)=>{ return item.category === categoryData}).map((item,key)=>{
    return(
      <Col key={key} lg={8} xs={24} md={12} sm={24} xl={6}>
        <ItemList item={item}/>
      </Col>
   ) })}
    </Row>

         
      </DefaultLayout>
   
      </div>
  )
}

export default Homepage
