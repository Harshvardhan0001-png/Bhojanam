import React, { useEffect, useState } from 'react';
import './List.css'
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({url}) => {

    
    const [list,setList] = useState([]);

    const fetchList = async ()=>{
        const response = await axios.get(`${url}/api/food/list`);
        
        if(response.data.success){
            setList(response.data.data);
        }else{
            toast.error("error");
        }

    }
    const removeFoodfromDb = async (foodid)=>{
       const response = await axios.post(`${url}/api/food/remove`,{id:foodid});
       await fetchList();
       if(response.data.success){
        toast.success(response.data.message);
       }else{
        toast.error("error");
       }
    }
    useEffect(()=>{
        fetchList();
    },[])
  return (
    <div className='list add flex-col'>
        <p>All food items</p>
        <div className="list-table">
           <div className="list-table-format columns">
            <b>image</b>
            <b>name</b>
            <b>category</b>
            <b>price</b>
            <b>action</b>
           </div>
           {list.map((item,index)=>{
               return (
                <div key={index} className='list-table-format'>
                    <img src={`${url}/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={()=>removeFoodfromDb(item._id)} className='Removeitem'>x</p>
                </div>
               )
           })}
        </div>
      
    </div>
  )
}

export default List
