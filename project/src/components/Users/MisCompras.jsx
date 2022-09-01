import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Banner from "../../commons/Banner/Banner";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const MisCompras = () => {
  const user = useSelector((state) => state.user);
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
    .get(`http://localhost:3001/api/orders/${user.id}`)
    .then((res) => res.data)
    .then((data) => {
      setOrders(data);
      console.log("data",data);
    })}, []);

  

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#03A696",
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
     
  return (
    <div style={{ backgroundColor: "#e0e0e0", paddingBottom: 30 }}>
      <Banner
        text={"Mis compras"}
        image={"https://i.blogs.es/ca628a/batidos/1366_2000.jpg"}/>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 360 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell>N* de Orden</StyledTableCell>
            <StyledTableCell align="right">Fecha de compra</StyledTableCell>
            <StyledTableCell align="right">Cantidad de productos</StyledTableCell>
            <StyledTableCell align="right">Pago Total</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.createdAt.split("T").join(" hora: ").split(".").splice(0,1)}</StyledTableCell>
              <StyledTableCell align="right">{row.products.length}</StyledTableCell>
              <StyledTableCell align="right">${row.total}</StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default MisCompras;
