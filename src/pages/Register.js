import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Login.css"
import axios from 'axios'
const Register = (props) => {
 const navigate = useNavigate();
 const [success,setSuccess] = useState();
useEffect(() => {

  
 setTimeout(() => {
    if(sessionStorage.getItem('auth')){
        navigate('/');
     }
    setSuccess("");
 }, 1900);

},[success,navigate])

    const handleSubmit = async(e) => {
        e.preventDefault()

       
      if(props.state){
         console.log(e.target[0].value)
        await axios.post('/auth/login',{
            
            email : e.target[0].value,
            password : e.target[1].value
           })
          .then(function (response) {
            setSuccess("Login Successful");
            console.log(response);
            sessionStorage.setItem('auth',JSON.stringify(response.data._id));
            setTimeout(() => {
                navigate('/');
            },2000)
           
          })
          .catch(function (error) {
            console.log(error.message);
            setSuccess("Login Failed..");
          });
      }
else{


       await axios.post('/auth/register',{
        name : e.target[0].value,
        email : e.target[1].value,
        password : e.target[2].value
       })
      .then(function (response) {
        setSuccess("Successfully Registered");
        console.log(response);
        setTimeout(() => {
            navigate('/login');
        },1500)
       
      })
      .catch(function (error) {
        console.log(error.message);
        setSuccess("Registration Failed" );
      });
    }

    }


  return (
    <div className='register'>

        <div className="login"> 
        <h2> POS </h2>
                  <h3> {props.state ? "Login Page":"Sign Up Page"} </h3>
                  {success && <div className='success' role={alert} style={{color:"white",background:"#dc3545", fontFamily:"sans-serif",width:"30%",height:"10%", marginLeft:"35%"}}>{success}</div>}
        <div className="col-right">
                <div class="login-form">
               
                    <form  onSubmit= {(e)=>handleSubmit(e)} action="/">

                  
                  { props.state ? null : <p> <label>Name<span> </span></label> <input type="text" placeholder="Name" required/> </p>  }
                        <p> <label>UserID<span> </span></label> <input type="text" placeholder="Username or Email" required/> </p>
                        <p> <label>Password<span> </span></label> <input type="password" placeholder="Password" required/> </p>
                        <p> <input  style={{ width:"120px"}} type="submit" value={props.state ? "Login":"Sign up"}/ > </p>
                        
                    </form>
                    
                   
                </div>
            </div>
            </div>
            {!props.state? <div><p> Already a User, Please</p> <a href="/login"><p> Login Here !</p></a> </div> :<div><p>Not Registered !</p><a href='/register'>Sign Up</a> </div>}
        </div>
  




  )
}

export default Register
