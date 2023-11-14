import React, { useState } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const host_url = process.env.REACT_APP_HOST_URL;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function Dashboard() {
    const navigate = useNavigate();
    const [totalproduct, setTotalproducts] = React.useState("");
    const [totalorder, setTotalorder] = React.useState("");
    const [totalcustomer, setTotalcustomer] = React.useState("");
    const [totalsale, setTotalsale] = React.useState("");


    const [CustomersBuket, setCustomersBuket] = React.useState([]);
    const [productBuket, setProductsBuket] = React.useState([]);
    const [ordersBuket, setOrderBuket] = React.useState([]);
    

    // set the data for page handlling
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

   React.useEffect(() =>{
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login")
    };
   },[]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host_url}dashboard`);
                console.log("check 1");
                console.log(response.data);
                console.log("chek 1.1");
                setTotalproducts(response.data.data.totalProducts);
                setTotalcustomer((response.data.data.totalcustomers));
                setTotalorder(response.data.data.totalorders);
                setTotalsale(response.data.data.sales[0].grandtotal);

                setProductsBuket(response.data.data.products);
                setCustomersBuket(response.data.data.customers);
                setOrderBuket(response.data.data.orders)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handlelogout = () =>{
        localStorage.removeItem('token');       
        navigate("/login");
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center" >
                    <Grid item xs={6}>
                        <Item sx={{ border: "0", background: "white", boxShadow: "none", }}>
                            <h1 style={{ margin: "0", color: "#0768A8", fontSize: "4rem" }}>Welcome IMT</h1>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

            <Grid item xs>
                <Item style={{ boxShadow: "none", textAlign: "right" }}>
                    <Link to="/products">
                        <Button variant="contained" endIcon={<SendIcon />} style={{ margin: "15px" }}>Add products</Button>
                    </Link>
                    <Link to="/order">
                        <Button variant="contained" size="medium">Create order</Button>
                    </Link>
                </Item>
            </Grid>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Item variant="h2" style={{ color: "black", fontSize: "2rem" }}>
                            Total Products
                        </Item>
                        <Item variant="h3" style={{ color: "#0768A8" }}>
                            {totalproduct}
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item variant="h2" style={{ color: "black", fontSize: "2rem" }}>
                            Total orders
                        </Item>
                        <Item variant="h3" style={{ color: "#0768A8" }}>
                            {totalorder}
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item variant="h2" style={{ color: "black", fontSize: "2rem" }}>
                            Total Sales
                        </Item>
                        <Item variant="h3" style={{ color: "#0768A8" }}>
                            {totalsale}
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item variant="h2" style={{ color: "black", fontSize: "2rem" }}>
                            Total Customers
                        </Item>
                        <Item variant="h3" style={{ color: "#0768A8", fontSize: "rem" }}>
                            {totalcustomer}
                        </Item>
                    </Grid>
                </Grid>
            </Box>

          
                <Grid item xs={6} sx={{marginBottom:"4rem"}}>
                    <Item >
                        <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead  >
                                        <TableRow>
                                            <TableCell align="center" colSpan={2} style={{background:"lightblue"}}>
                                                Product Name
                                            </TableCell>
                                            <TableCell align="center" colSpan={3} style={{background:"lightblue"}}>
                                                price
                                            </TableCell>
                                            <TableCell align="center" colSpan={3} style={{background:"lightblue"}}>
                                                quantity
                                            </TableCell>
                                        </TableRow> 
                                    </TableHead>
                                    <TableBody>
                                        {productBuket.map((data, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="center" colSpan={2}>
                                                    {data?.name}
                                                </TableCell>
                                                <TableCell align="center" colSpan={3}>
                                                    {data?.price}
                                                </TableCell>
                                                <TableCell align="center" colSpan={3}>
                                                    {data?.quantity}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                count={productBuket.length} 
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Item>
                </Grid>
               

        
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item   >
                        <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={2} style={{background:"lightblue"}}>
                                                Customers Name
                                            </TableCell>
                                            <TableCell align="center" colSpan={3} style={{background:"lightblue"}}>
                                                Customers phonenumber
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {CustomersBuket.map((data, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="center" colSpan={2}>
                                                    {data?.userName}
                                                </TableCell>
                                                <TableCell align="center" colSpan={3}>
                                                    {data?.userPhoneNumber}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                count={CustomersBuket.length} 
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item >
                        <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={2} style={{background:"lightblue"}}>
                                                order Numbers
                                            </TableCell>
                                            <TableCell align="center" colSpan={3} style={{background:"lightblue"}}>
                                                grandtotal
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ordersBuket.map((data, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="center" colSpan={2}>
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell align="center" colSpan={3}>
                                                    {data?.grandtotal}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>


                                </Table>
                            </TableContainer>
                            <TablePagination
                                count={ordersBuket.length} // Set the total number of rows
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Item>
                </Grid>

            </Grid>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center" >
                    <Grid item xs={6}>
                        <Item sx={{ border: "0", background: "white", boxShadow: "none", }}>
                            <Button onClick={handlelogout} variant="contained" size="large">Logout</Button>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default Dashboard;