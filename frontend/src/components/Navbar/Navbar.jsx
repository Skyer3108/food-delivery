import React, { useContext, useState } from "react"
import './Navbar.css'
import { assets } from "../../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { StoreContext } from "../../context/StoreContext"


const Navbar=({setShowLogin})=>{

    const [menu,setMenu]=useState('home')
    const {getTotalCartAmount,token,setToken}=useContext(StoreContext)

    const navgate=useNavigate()

    const logOut=()=>{
        localStorage.removeItem('token');
        setToken('')
        navgate('/')


    }


    return(
        <div className='navbar'>

            <Link to='/'> <img src={assets.logo} alt="" className="logo"/></Link>

          

           <ul className='menu'>

            <Link to='/'  onClick={()=>setMenu('home')} className={menu==="home"?"active":""}>Home </Link>
            <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu('mobile-app')}  className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href="#footer" onClick={()=>setMenu('contact-us')} className={menu==="contact-us"?"active":""}>Conatct us</a>
            
           </ul>

           <div className='nav-right'>
            <img src={assets.search_icon} alt=""/>

            <div  className='navbar-ser-icon'>

                <Link to='/cart'><img src={assets.basket_icon}/></Link>

                
                <div className={getTotalCartAmount()===0?"":'dot'}></div>

               

            </div>

            {
              !token ? <button onClick={()=>setShowLogin(true)}>Sing In</button>:
              <div  className="navbar-profile">

                <img src={assets.profile_icon} />
                <ul className="nav-profil-dropdown">
                    <li onClick={()=>navgate('/myorders')}>
                        <img src={assets.bag_icon}/>
                        <p>Orders</p>
                    </li>
                    <hr />
                    <li onClick={logOut}>
                    <img src={assets.logout_icon}/>
                    <p>Logout</p>
                    </li>
                </ul>

              </div>
            }

            

           </div>
        </div>
    )
}

export default Navbar