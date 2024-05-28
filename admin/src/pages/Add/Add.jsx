import { assets } from '../../assets/assets'
import { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'
//import { useEffect } from 'react'

const Add = () => {

    const url='http://localhost:5000'
    const [img,setImg]=useState(false)

    const [data,setData]=useState({
        name:"",
        description:'',
        price:"",
        category:"Salad"
    })

    const onChangeHandler=(event)=>{

       const name=event.target.name;
       const value=event.target.value;

       setData(data=>({...data,[name]:value}))
    }

    // useEffect(()=>{
    //     console.log(data)

    // },[data])

    const onSubmitHandler=async(event)=>{

        event.preventDefault()

        const formData=new FormData();
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',Number(data.price))
        formData.append('category',data.category)
        formData.append('image',img)

        const response=await axios.post(`${url}/food/add`,formData)

        if(response.data.sucess){

            setData({
                name:"",
                description:'',
                price:"",
                category:"Salad"
            })

            setImg(false)

            toast.success(response.data.message)
        }
        else{

            console.log(response.data.message)

            toast.success(response.data.message)

        }

        

    }

    return (
        <div className='add'>

            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col" >
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={img?  URL.createObjectURL(img) : assets.upload_area} />

                    </label>
                    <input onChange={(e)=>setImg(e.target.files[0])} type='file' id='image' hidden required />
                </div>



                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name}  type="text" name='name' placeholder='Type here' />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description </p>

                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Wrie content Here' required></textarea>

                </div>

                <div className="add-category-price">
                    <div className="add-category flrx-col">
                        <p>Product Category</p>

                        <select onChange={onChangeHandler} value={data.category}  name="category" id="">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>

                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
                    </div>
                </div>

                <button type='submit' className='add-btn'>Add</button>



            </form>



        </div>
    )
}
export default Add