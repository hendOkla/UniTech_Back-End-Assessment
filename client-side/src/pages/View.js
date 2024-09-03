import React , {useState , useEffect} from "react";
import { useParams ,Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward  } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import axios from "axios";


const View =()=>{
    const[ product, setProduct] = useState(null);
    const {id} = useParams();

    //call one  product using by ID when open page
    useEffect(()=>{
        if(id){
            getSingleProduct(id);
        }
    },[id])

    //make route using by axios for server side to get all products in array using by id in server side
    const getSingleProduct = async(id) =>{
        try {
            const response = await axios.get(`http://localhost:5000/product/${id}`)
            if (response.status ===200){
                setProduct({...response.data[0]});
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
            <h2>Product detail</h2>
            <div className="container d-flex justify-content-center " style={{ height: '50vh' }}>
            <div className="card col-lg-6">
                <div className="card-body">
                    <div className="mb-5">
                        <label htmlFor="productName" className="form-label">Product Name:  </label>
                        <strong>{product && product.productName}</strong>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="form-label">
                        Price: 
                        </label>
                        <strong>{product && product.price}</strong>
                    </div>
                    <div className="mb-5">
                        <Link to="/">
                            <button className="btn btn-primary"> <FontAwesomeIcon icon={faBackward} /> Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default View