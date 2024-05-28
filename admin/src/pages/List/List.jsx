import './List.css'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { toast } from 'react-toastify'

const List=()=>{

    const url='http://localhost:5000'

    const [list,setList]=useState([])


    const fetchList=async()=>{
         const response=await axios.get(`${url}/food/list`)

        console.log(response.data)
        if(response.data.sucess){
            setList(response.data.data)
        }
        else{
            toast.error("Error")
        }
    }
    useEffect(()=>{

        fetchList()

    },[])

    const removeFood=async(foodId)=>{

        console.log(foodId)

        const response=await axios.post(`${url}/food/remove`,{id:foodId})

        await fetchList()

        if(response.data.sucess){
            toast.success(response.data.message)
        }

        else{
            toast.error('Error')
        }

    }


    return(
        <div className='list add flrx-col'>

            <p>All Foods List</p>

            <div className='list-table'>
                <div className="list-table-formate title">
                    <b>Images</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>

                {
                    list.map((item,index)=>{

                        return(
                            <div key={index} className='list-table-formate'>

                                <img src={`${url}/images/`+item.image}/>

                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>${item.price}</p>
                                <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>


                                </div>
                        )

                    })
                }

            </div>


        </div>
    )
}
export default List