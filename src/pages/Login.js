import React,{useState} from 'react'
import Register from './Register'

const Login = () => {
    const [login,setLogin] = useState([])
  return (
    <div> 
    <Register state={login}>

    </Register>
    </div>
  )
}

export default Login
