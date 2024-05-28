
import { useNavigate, useSearchParams } from 'react-router-dom'
import './verify.css'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const Verify=()=>{

    const [searchParams,setSearchParams]=useSearchParams()
     
    const sucess=searchParams.get("success")

    const orderId=searchParams.get("orderId")

    const {url}=useContext(StoreContext)

    const navigate =useNavigate()

    const verifyPayment=async()=>{

       

        const responce=await axios.post(url+'/api/order/verify',{sucess,orderId})


        console.log(searchParams,responce.data.sucess,responce.data.orderId)


        if(responce.data.sucess){

            navigate("/myorders")

        }

        else{
            navigate("/")
        }

    }

    useEffect(()=>{

        verifyPayment()

    },[])

    return(
        <div className='verify'>

           <div className="spinner">
            
           </div>

        </div>
    )
}

export default Verify