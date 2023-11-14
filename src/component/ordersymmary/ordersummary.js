import * as React from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const host_url = process.env.REACT_APP_HOST_URL;

function Ordersummary() {
    const navigate = useNavigate();
    const [username, setUserName] = React.useState("");
    const [userPhoneNumber, setUserPhoneNumber] = React.useState("");


    const items = useSelector((state) => state.order.items);
    const quantity = useSelector((state) => state.order.quantity);
    const grandTotal = useSelector((state) => state.order.grandTotal);
    console.log("Items on order summary page: ", items);
    console.log("Quantity on order summary page: ", quantity);
    console.log("Grand total on order summary page: ", grandTotal);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [successState, setSuccessState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleKeyDown = (e) => {
        if (e.key === '-' || e.key === 'e' || e.key === '.') {
            e.preventDefault();
        }
        if (userPhoneNumber.length >= 10 && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "name":
                setUserName(value);
                break;
            case "phonenumber":
                setUserPhoneNumber(value);
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

    const handlePrintClick = async () => {
        if (!username || !userPhoneNumber || !grandTotal || !quantity) {
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
            return;
        }
        if (userPhoneNumber.length<10){
            setSuccessState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            });
            setTimeout(() => {
                setSuccessState({
                    ...successState,
                    open: false,
                });
            }, 4000);
            return;

        }

        const userdata = {
            UserName: username,
            UserPhoneNumber: userPhoneNumber,
            GrandTotal: grandTotal,
            Quantity: quantity
        }
        const response = await axios.post(`${host_url}ordersummary`, userdata);
        console.log(response);

        setUserName("");
        setUserPhoneNumber("");
     
        navigate("/dashboard");
    }


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Item style={{ boxShadow: "none" }}>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h4'>Order Summary</Typography>
                </Grid>
                <Grid item xs>
                    <Item style={{ boxShadow: "none" }}></Item>
                </Grid>
            </Grid>


            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <input
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={username}
                    style={{ height: "20px", marginBottom: "10px", width: "200px", marginBottom: "20px", marginLeft: "25px" }}
                />
                <input
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Phone Number"
                    name="phonenumber"
                    value={userPhoneNumber}
                    style={{ height: "20px", width: "200px", marginLeft: "25px" }}
                />
            </div>


            <hr style={{ marginBottom: "20px" }}></hr>

            <>
                <Grid sx={{ px: 1 }} xs={12}>
                    <Box>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <ListItemText secondary="Name" />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText secondary="Price" />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText secondary="Quantity" />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText secondary="Total of Item" />
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                            {items.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <ListItemText secondary={item.name} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <ListItemText secondary={item.price} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <ListItemText secondary={quantity[item.barcode]} />
                                            </Grid>
                                            <Grid item xs={3} sx={{ color: "#0768A8" }}>
                                                <ListItemText secondary={item.price * quantity[item.barcode]} />
                                            </Grid>
                                        </Grid>
                                    </ListItemButton>
                                </ListItem>
                            ))}

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <ListItemText secondary="GRAND TOTAL" />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText secondary="" />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText secondary="" />
                                        </Grid>
                                        <Grid item xs={3} sx={{ color: "#0768A8" }}>
                                            <ListItemText secondary={grandTotal} />
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </>


            <Grid item xs>
                <Item style={{ boxShadow: "none", textAlign: "right" }}>
                    <Button onClick={handlePrintClick} variant="contained" style={{ marginLeft: "1rem", marginRight: "1rem", paddingLeft: "2rem", paddingRight: "2rem" }} disableElevation>Print</Button>
                </Item>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: successState.vertical,
                    horizontal: successState.horizontal,
                }}
                open={successState.open}
                message="placed"
                key={successState.vertical + successState.horizontal}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    phonenumber is incomplete
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
                open={state.open}
                message="incomplete field"
                key={state.vertical + state.horizontal}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                  filled are missing
                </Alert>
            </Snackbar>

        </>
    )
}

export default Ordersummary;