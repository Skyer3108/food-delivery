import {  useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

import { StoreContext } from '../../context/StoreContext'

import axios from 'axios'

const LoginPopUp = ({ setShowLogin }) => {

    const {url,setToken}=useContext(StoreContext)

    

    const [currentState, setCurrentState] = useState("Login")

    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onLogin=async(event)=>{

        event.preventDefault()

        let newUrl=url

        if(currentState==='Login'){
            newUrl+='/api/user/login'
        }
        else{
            newUrl+='/api/user/register'
        }

        const response=await axios.post(newUrl,data)

        if(response.data.sucess){

            setToken(response.data.token)

            localStorage.setItem('token',response.data.token)

            setShowLogin(false)

            
        }
        else{
            alert(response.data.message)
        }



    }


    const onChangeHandler=(event)=>{
        
        const name=event.target.name
        const value=event.target.value

        setData(data=>({...data,[name]:value}))

    }

  


    return (
        <div className='login-popup'>



            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-pop-tittle">
                    <h2>{currentState}</h2>

                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>

                <div className='login-popup-input'>

                    {
                        currentState === 'Login' ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Your Name'  type='text' required />

                    }
                    <input name='email' onChange={onChangeHandler}  value={data.email}  placeholder='Enter Your Email' type='email' required />

                    <input name='password' onChange={onChangeHandler}  value={data.password} placeholder='Enter Your Password' type='password' required />
                </div>

                <button type='submit'>{currentState === 'Sign Up' ? "Create Account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
                {
                    currentState === 'Login' ? <p>Create a new account ? <span onClick={() => setCurrentState('Sign Up')}>Click Here</span></p>
                        : <p>Already have a account ? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }


            </form>


        </div>
    )
}

export default LoginPopUp