import React ,  {useState , useEffect} from "react"
import { useNavigate , useParams } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios"


const initialState = {
    productName:'',
    price:''
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        //check if isset id in param link get single element using by id to display product detail
        if(id){
            getSingleProduct(id);
        }
    },[id])


    //make route using by axios for server side to get single product using by product id 
    const getSingleProduct = async(id) =>{
        const response = await axios.get(`http://localhost:5000/product/${id}`)
        if (response.status ===200){
            setState({...response.data[0]});
        }
    }


    //make route using by axios for server side to add product to array in server side
    const addProduct = async (data) => {
        const { productName, price } = data;
        const errors = [];


        //check product name validation ==> 1# product name is require 2# product name most contain just characters or characters and numbers
        if (!productName) {
            errors.push({ field: 'productName', message: 'Product name is required' });
        } else if (!/^[a-zA-Z ]*$/.test(productName) && !/^(?=.*[a-zA-Z ])(?=.*\d).*$/.test(productName)) {
            errors.push({ field: 'productName', message: 'Product name must contain only characters or both numbers and characters' });
        }


        //check product name validation ==> 1# price is require 2# product price most be valid amount (float)  
        if (!price) {
            errors.push({ field: 'price', message: 'Price is required' });
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            errors.push({ field: 'price', message: 'Price must be a valid amount' });
        }
    
        //check if array error is empty or not
        if (errors.length > 0) {
            errors.forEach(error => {
                toast.error(`${error.message}`);
            });
            return;
        }
    
        // Proceed with the API call if validation passes
        try {
            const response = await axios.post(`http://localhost:5000/product`, data);
            if (response.status === 200) {
                toast.success(response.data);
            }
        } catch (error) {
            // Handle API call errors
            error.forEach(error => {
                toast.error(`${error}`);
            });
            return;
        }
    };

    //make route using by axios for server side to update product in array using by id in server side
    const updateProduct = async (data, id) =>{

        const { productName, price } = data;
        const errors = [];
    
        //check product name validation ==> 1# product name is require 2# product name most contain just characters or characters and numbers
        if (!productName) {
            errors.push({ field: 'productName', message: 'Product name is required' });
        } else if (!/^[a-zA-Z ]*$/.test(productName) && !/^(?=.*[a-zA-Z ])(?=.*\d).*$/.test(productName)) {
            errors.push({ field: 'productName', message: 'Product name must contain only characters or both numbers and characters' });
        }


        //check product name validation ==> 1# price is require 2# product price most be valid amount (float)  
        if (!price) {
            errors.push({ field: 'price', message: 'Price is required' });
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            errors.push({ field: 'price', message: 'Price must be a valid amount' });
        }
    
        //check if array error is empty or not
        if (errors.length > 0) {
            errors.forEach(error => {
                toast.error(`${error.message}`);
            });
            return;
        }
         // Proceed with the API call if validation passes
        try {
            const response = await axios.put(`http://localhost:5000/product/${id}`, data);
            if (response.status === 200) {
                toast.success(response.data);
            }
        } catch (error) {
            // Handle API call errors
            error.forEach(error => {
                toast.error(`${error}`);
            });
            return;
        }
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        /*
        check if isset id or not on make submit 
        1==>ID is not isset call add product 
        2==>ID is  isset call UPDATE product 
        */
        if (!id) {
            addProduct(state);
        } else {
            updateProduct(state, id);
        }        
        setTimeout(() => navigate('/'), 500);
    };
    
    //to handle changes in input fields.
    const handleInputChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="container mt-5">
            <h2>{id?"Update product details": "Create new product"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="container d-flex justify-content-center " style={{ height: '50vh' }}>
                    <div className="card col-lg-6">
                        <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name <span>*</span></label>
                            <input
                            type="text"
                            name="productName"
                            className="form-control"
                            id="productName"
                            placeholder="Enter Product name"
                            onChange={handleInputChange}
                            value={state.productName}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price<span>*</span></label>
                            <input
                            type="text"
                            name="price"
                            className="form-control"
                            id="price"
                            placeholder="Enter Price"
                            onChange={handleInputChange}
                            value={state.price}
                            />
                        </div>
                        <div className="mb-4">
                            <input type="submit" className="btn btn-primary" value={ id?"Update": "Add"} />
                        </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
  };

export default AddEdit