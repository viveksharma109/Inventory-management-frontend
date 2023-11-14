import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const host_url = process.env.REACT_APP_HOST_URL;

function Products() {
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [barcode, setBarcode] = React.useState("");
    const [expiry, setExpiry] = React.useState("");
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    // const { vertical, horizontal, open } = state;


    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleBarcodeSearch = async (event) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
            try {
                const response = await axios.get(`${host_url}get-products/${barcode}`);
                console.log(response);
                setName(response.data.data[0].name);
                setDescription(response.data.data[0].description);
                setPrice(response.data.data[0].price);
                setQuantity(response.data.data[0].quantity);
                setCategory(response.data.data[0].category);
                const newExpiryDate = formatDate(new Date(response.data.data[0].expiry));
                setExpiry(newExpiryDate);

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const HandleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, ": ", value);
        switch (name) {
            case "name":
                setName(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "quantity":
                setQuantity(value);
                break;
            case "category":
                setCategory(value);
                break;
            case "barcode":
                setBarcode(value);
                break;
            case "expirydate":
                setExpiry(value);
                break;
            default:
                console.log("Invalid input name");
        }
    }
    React.useEffect(() =>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login")
        };
       },[]);
    useEffect(() => {
        console.log(`Type: ${typeof (expiry)}, expiry: ${expiry}`);
    }, [expiry])

    const handleUpdateClick = async () => {
        const productData = {
            Name: name,
            Description: description,
            Price: price,
            Quantity: quantity,
            Category: category,
            Barcode: barcode,
            Expiry: expiry
        }
        const response = await axios.post(`${host_url}products`, productData);
        console.log(response);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setBarcode("");
        setExpiry("");
        setState({
            open: true,
            vertical: 'top',
            horizontal: 'right',
        });
        setTimeout(() => {
            setState({
              ...state,
              open: false,
            });
          }, 2000);
       
    }

    const handleKeyDown = (e) => {
        // Block negative values
        if (e.key === '-' || e.key === 'e' || e.key === '.') {
            e.preventDefault();
        }
    };

    return (
        <>
            <Card sx={{ minWidth: 275, boxShadow: "none" }}>
                <CardContent sx={{ justifyContent: "center", alignItems: "center", display: "flex", mt: 12 }}>
                    <div style={{ background: "lightblue", padding: "15px", borderRadius: "7px" }}>
                        <Typography variant="h3" >
                            Products add
                        </Typography>
                        <Typography gutterBottom>
                            <label for="barcode" style={{ fontFamily: "serif", margin: "16px" }}>Barcode</label>
                            <input   onKeyDown={handleKeyDown} onChange={HandleInputChange} onKeyPress={handleBarcodeSearch} type="number" placeholder="barcode" name="barcode" value={barcode} />
                        </Typography>
                        <Typography gutterBottom>
                            <label for="name" style={{ fontFamily: "serif", margin: "25px" }}>Name</label>
                            <input onChange={HandleInputChange} type="text" placeholder="name" name="name" value={name} />
                        </Typography>
                        <Typography gutterBottom>
                            <label for="description" style={{ fontFamily: "serif", margin: "7px" }}>Description</label>
                            <input onChange={HandleInputChange} type="text" placeholder="description" name="description" value={description} />
                        </Typography>
                        <Typography gutterBottom>
                            <label for="price" style={{ fontFamily: "serif", margin: "28px" }}>Price</label>
                            <input  onKeyDown={handleKeyDown} onChange={HandleInputChange} type="price" placeholder="price" name="price" value={price} />
                        </Typography>
                        <Typography gutterBottom>
                            <label for="quantity" style={{ fontFamily: "serif", margin: "16px" }}>Quantity</label>
                            <input onKeyDown={handleKeyDown} onChange={HandleInputChange} type="number" placeholder="quantity" name="quantity" value={quantity} />
                        </Typography>
                        <Typography gutterBottom>
                            <label for="category" style={{ fontFamily: "serif", margin: "14px" }}>Category</label>
                            <input onChange={HandleInputChange} type="text" placeholder="category" name="category" value={category} />
                        </Typography>

                        <Typography gutterBottom>
                            <label for="expirydate" style={{ fontFamily: "serif", margin: "7px" }}>expiry date</label>
                            <input onChange={HandleInputChange} type="date" placeholder="date" style={{ width: "165px" }} name="expirydate" value={expiry} />
                        </Typography>
                        <div style={{ margin: "20px" }}>
                            <Link to="/dashboard">
                                <Button variant="contained" style={{ background: "red", fontSize: 20, fontFamily: "serif", margin: "40px" }} >cancel</Button>
                            </Link>
                            <Button variant="contained" onClick={handleUpdateClick} style={{ background: "#0768A8", color: "white", fontSize: 20, fontFamily: "serif", margin: "40px" }} >Update product</Button>
                        </div>
                    </div>
                </CardContent>
                <Snackbar
                    anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
                    open={state.open}
                    message="Added"
                    key={state.vertical + state.horizontal}
                >
                <Alert severity="success" sx={{ width: '100%' }}>
                     Added
                </Alert>
                </Snackbar>
            </Card>
        </>
    )
}
export default Products;