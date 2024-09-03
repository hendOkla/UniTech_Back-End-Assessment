import React , {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit  } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan  } from '@fortawesome/free-solid-svg-icons';
import { faEye  } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import axios from "axios";


const Home =()=>{
    const [data, setData] = useState([]);

    //call all product when open page
    useEffect(()=>{
        getProducts();
    },[])

    //make route using by axios for server side to delete product in array using by id in server side
    const deleteProduct = async(id ,productName) =>{
        if(window.confirm(`Are you sure that you want to delete  ${ productName }   product?`)){
            try {
                const response = await axios.delete(`http://localhost:5000/product/${id}`)
                if (response.status ===200){
                    toast.success(response.data);
                    getProducts();
                }
            } catch (error) {
                // Handle API call errors
                error.forEach(error => {
                    toast.error(`${error}`);
                });
                return;
            }
            
        }
    }

    //make route using by axios for server side to get all products in array using by id in server side
    const getProducts = async ()=>{
        try {
            const response = await axios.get("http://localhost:5000/products");
            if(response.status ===200){
                setData(response.data)
            }
        } catch (error) {
            // Handle API call errors
            error.forEach(error => {
                toast.error(`${error}`);
            });
            return;
        }
    }
    return(
        <div className="container mt-5">
            <h2>Product Management System</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td scope="row">{index +1}</td>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-warning m-2 head-color"><FontAwesomeIcon icon={faEdit} /> Edit</button>
                                    </Link>
                                    <button className="btn btn-danger m-2" onClick={()=>deleteProduct(item.id ,item.productName)}><FontAwesomeIcon icon={faTrashCan} />    Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-primary m-2"> <FontAwesomeIcon icon={faEye} />  View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Home