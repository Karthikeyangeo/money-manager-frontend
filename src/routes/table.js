import * as React from 'react';
import { useState ,useEffect} from 'react';
import {API} from './global';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


 function ReportTable(){
  const history = useHistory();
    const EditButton = (params) => {
        return (
            <strong>
                <IconButton onClick={()=> {
                  let id=params.row._id;
                  console.log(id)
                  history.push(`/track/edit/${id}`)
                }}
                
                sx={{m: 5}}>
                <EditIcon  color='primary'/>
              </IconButton>
            </strong>
        )
    }
    
    const DeleteButton = (params) => {
        return (
            <strong>
                <IconButton onClick={()=> removeData(params.row._id)} sx={{m: 5}}>
                <DeleteIcon  color='error'/>
              </IconButton>
            </strong>
        )
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'type', headerName: 'Type', width: 130 },
        { field: 'displayDate', headerName: 'Date', width: 130 , sortable: false},
        { field: 'desc', headerName: 'Description', width: 130 },
        {
          field: 'amount',
          headerName: 'Amount',
          type: 'number',
          width: 130
        },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'division', headerName: 'Description', width: 130 },
        // {field:'edit',headerName:'Edit',width:130,renderCell: EditButton},
        {field:'delete',headerName:'Delete',width:130,renderCell: DeleteButton}
        
      ];
    
    const [amtData,setAmtData]= useState([]);

    const incomeArray = amtData.filter(x=>x.type ==='Income');
    const incomeTotal = incomeArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

    const expenseArray = amtData.filter(x=>x.type ==='Expense');
    const expenseTotal = expenseArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

    
    console.log(`incomeTotal`,incomeTotal);
    console.log(`income`,incomeArray);
    console.log(`expense`,expenseArray);
    console.log(`expensetotal`,expenseTotal);
    
  
    const getAmt = async () =>{
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
    useEffect(getAmt);
    // useEffect(()=>{
    //   async function getAmt(){
    //     await fetch(`${API}/track`,{
    //         method : 'GET'
    //     })
    //     .then(response => response.json())
    //     .then( res =>{
    //      console.log(res);
    //      for(let i=0;i<res.length;i++){
    //        res[i].id= i+1;
    //      }
    //       setAmtData(res);
    //     })
    //     .catch( err => console.log(err));
    // }
    // getAmt()
    // },[])

    const removeData =(id)=>{
        fetch(`${API}/track/${id}`,{
          method : "Delete",
        }).then(()=> getAmt());
    
    }
    
    return(
      <div className='report'>
        <div className='dataTable'>
            <div style={{ height: 400, width: '100%',textAlign: "center" }}>
            <DataGrid
            component={Paper}
            getRowId={(r) => r._id}
            rows={amtData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            elevation={5}
            
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

 

export {  ReportTable};