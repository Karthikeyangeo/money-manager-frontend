import * as React from 'react';
import { useState ,useEffect} from 'react';
import {API,rows} from './global';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'desc', headerName: 'Description', width: 130 },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 130,
    },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'division', headerName: 'Description', width: 130 },
    
  ];
  



export function Report(){
    
    const [amtData,setAmtData]= useState([]);

    const incomeArray = amtData.filter(x=>x.type ==='Income');
    const incomeTotal = incomeArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

    const expenseArray = amtData.filter(x=>x.type ==='Expense');
    const expenseTotal = expenseArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

    const fullTotal = incomeTotal + expenseTotal;
    console.log(`incomeTotal`,incomeTotal)
    console.log(`income`,incomeArray)
    console.log(`expense`,expenseArray)
    console.log(`expensetotal`,expenseTotal)
    
  
    let getAmt = async () =>{
        await fetch(`${API}/track`,{
            method : 'GET'
        })
        .then(response => response.json())
        .then( res =>{
         console.log(res);
          setAmtData(res);
        })
        .catch( err => console.log(err));
    }
    
    useEffect(getAmt,[])
    
    return(
      <div className='report'>
        <div className='dataTable'>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            getRowId={(r) => r._id}
            rows={amtData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            
            />
            </div>
        </div>  
        <div className='sum'>
          {/* .toLocaleString('en-IN') is used to convert the number to Indian Metric system */}
          <Button style={{ textTransform : 'none'}} variant="outlined" className='totalbtn' color='success'>Income Total<br /> {incomeTotal.toLocaleString('en-IN')}</Button>
          <Button style={{ textTransform : 'none'}}variant="outlined" className='totalbtn' color='error'>Expense Total<br /> {expenseTotal.toLocaleString('en-IN')}</Button>
        </div>
      </div>
        

    )
}