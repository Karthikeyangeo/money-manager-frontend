// This page is written using normal material table 
// Just for testing purpose


import * as React from 'react';
import { useState ,useEffect} from 'react';
import {API} from './global';

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import {  IconButton } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




 function Report() {

  const [amtData,setAmtData]= useState([]);

    const incomeArray = amtData.filter(x=>x.type ==='Income');
    const incomeTotal = incomeArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

    const expenseArray = amtData.filter(x=>x.type ==='Expense');
    const expenseTotal = expenseArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

    
    console.log(`incomeTotal`,incomeTotal)
    console.log(`income`,incomeArray)
    console.log(`expense`,expenseArray)
    console.log(`expensetotal`,expenseTotal)
    
    
    useEffect(()=>{
      async function getAmt(){
        await fetch(`${API}/track`,{
            method : 'GET'
        })
        .then(response => response.json())
        .then( res =>{
         console.log(res);
         for(let i=0;i<res.length;i++){
           res[i].id= i+1;
         }
          setAmtData(res);
        })
        .catch( err => console.log(err));
    }
    getAmt()
    },[])
  return (
    <div className='report'>
      <div className='dataTable'>
        <TableContainer 
            component={Paper}
            elevation={5}
            pageSize={5}
            rowsPerPageOptions={[5]}
          >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >ID</TableCell>
                <TableCell >Type</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Description</TableCell>
                <TableCell >Amount</TableCell>
                <TableCell >Category</TableCell>
                <TableCell >Division</TableCell>
                <TableCell >Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {amtData.map((row,index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" >
                    {row.id}
                  </TableCell>
                  <TableCell >{row.type}</TableCell>
                  <TableCell >{row.date}</TableCell>
                  <TableCell >{row.desc}</TableCell>
                  <TableCell >{row.amount}</TableCell>
                  <TableCell >{row.category}</TableCell>
                  <TableCell >{row.division}</TableCell>
                  <TableCell >
                  <IconButton  aria-label="Edit Icon" onClick={()=>{console.log(index)}} color='primary' >
                    <EditIcon/>
                </IconButton>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
    <div className='sum'>
            {/* .toLocaleString('en-IN') is used to convert the number to Indian Metric system */}
             <Button style={{ textTransform : 'none'}} variant="outlined" className='totalbtn' color='success'>Income Total<br /> {incomeTotal.toLocaleString('en-IN')}</Button>
            <Button style={{ textTransform : 'none'}}variant="outlined" className='totalbtn' color='error'>Expense Total<br /> {expenseTotal.toLocaleString('en-IN')}</Button>
      </div>
    </div>
  );
}

export {Report};