import * as React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOrderItems, setOrderQuantity, setOrderGrandTotal } from '../../redux/slices/request';

const host_url = process.env.REACT_APP_HOST_URL;

function Order() {
    const navigate = useNavigate();
    const [barcode, setBarcode] = React.useState("");
    const [items, setItems] = React.useState([]);
    const [quantity, setQuantity] = React.useState({});
    const [grandTotal, setGrandTotal] = React.useState(0);
    const [itemToMove, setItemMove] = React.useState("");




    const handleInputchange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setBarcode(value);
    }

    const handelequantity = (e) => {
        const { name, value } = e.target;
        console.log(name, " ", value);
        setQuantity(prev => ({ ...prev, [name]: value }));
    }


    const handleKeyDown = (e) => {
        // Block negative values
        if (e.key === '-' || e.key === 'e' || e.key === '.') {
            e.preventDefault();
        }
    };
    React.useEffect(() =>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login")
        };
       },[]);

    React.useEffect(() => {
        console.log("Items: ", items);
        let sm = 0;
        for (let item of items) {
            const price = item.price;
            const barcode = item.barcode;
            sm += quantity[barcode] * price;
        }
        setGrandTotal(sm);
    }, [quantity])

    const handleAddClick = async () => {
        try {
            const { data } = await axios.get(`${host_url}order/${barcode}`);
            console.log(data);
            const newItem = data.data[0];
            setItems([...items, newItem]);
            setQuantity(prev => ({ ...prev, [newItem.barcode]: 1 }));
            setBarcode("");
        } catch (error) {
            console.error("Error while fetching data:", error);
           
        }
    };
    
    const dispatch = useDispatch();

    const handlePlaceOrder = () =>{
        if (items && items.length > 0) {
            dispatch(setOrderItems(items));
            dispatch(setOrderQuantity(quantity));
            dispatch(setOrderGrandTotal(grandTotal));
            navigate("/ordersummary");
        } else {
            navigate("/order");
        }
        
    }
    const moveId = (value) => {
        const updatedItems = items.filter(item => item.barcode !== value);
        setItems(updatedItems);
        setQuantity(prevQuantity => ({
            ...prevQuantity,
            [value]: 0,
        }));
    }


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Item style={{ boxShadow: "none", textAlign: "left" }}>
                        <Link to="/dashboard">
                            <Button sx={{ m: 1 }} variant="outlined" size="medium" >Dashboard</Button>
                        </Link>

                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h3'>Create Order</Typography>
                </Grid>
                <Grid item xs>
                    <Item style={{ boxShadow: "none" }}></Item>
                </Grid>
            </Grid>
            <Typography gutterBottom>
                <input  onKeyDown={handleKeyDown} onChange={handleInputchange} type="number" placeholder="barcode" name="barcode" value={barcode} />
            </Typography>
            <Button variant="contained" onClick={handleAddClick} style={{ paddingLeft: "30px", paddingRight: "30px", marginBottom: "1rem" }} disableElevation>
                Add
            </Button>

            <Grid sx={{ px: 1, }} xs={12}>
                <Box>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <ListItemText secondary="Name" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ListItemText secondary="Price" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ListItemText secondary="Quantity" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ListItemText secondary="Total of Item" />
                                    </Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>

                    </List>


                </Box>

            </Grid>

            <>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Grid item xs={12} key={index}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Grid container>
                                        <Grid item xs={3} sx={{ background: "lightblue" }}>
                                            <ListItemText secondary={item.name} />
                                        </Grid>
                                        <Grid item xs={2} sx={{ background: "lightblue" }}>
                                            <ListItemText secondary={item.price} />
                                        </Grid>
                                        <Grid item xs={2} sx={{ background: "lightblue" }}>
                                            <input onKeyDown={handleKeyDown} onChange={handelequantity} type="number" placeholder="quantity" name={item.barcode} value={quantity[item.barcode]} onInput={(e) => {
                                                if (e.target.value > item.quantity) {
                                                    e.target.value = item.quantity;
                                                }
                                            }} />
                                        </Grid>
                                        <Grid item xs={2} sx={{ background: "lightblue" }}>
                                            <ListItemText secondary={quantity[item.barcode] * item.price} />
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Button onClick={() => moveId(item?.barcode)} variant="contained" color="error" style={{ marginLeft: '100px' }}>Remove</Button>
                                        </Grid>

                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <ListItemText secondary="GRAND TOTAL" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ListItemText secondary="" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ListItemText secondary="" />
                                    </Grid>
                                    <Grid item xs={2} sx={{ color: "#0768A8" }}>
                                        <ListItemText secondary={grandTotal} />
                                    </Grid>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    </Grid>
                </Grid>
            </>

            <Grid item xs>
                <Item style={{ boxShadow: "none", textAlign: "right" }}>
                    <Button onClick={handlePlaceOrder} variant="contained" style={{ marginRight: "5rem", marginTop: "1rem" }} disableElevation>Place order</Button>
                </Item>
            </Grid>

        </>
    )

}
export default Order;