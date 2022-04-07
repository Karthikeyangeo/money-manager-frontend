import * as React from 'react';
import { useState ,useEffect} from 'react';
import {API} from './global';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { FormControlLabel, IconButton } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



// const Edit = ({ index }) => {

//   const handleEditClick = () => {
//       console.log(index)
//   }


//   return <FormControlLabel
//              control={
//                  <IconButton  aria-label="Edit Icon" onClick={handleEditClick} >
//                      <EditIcon  />
//                  </IconButton>
//              }
//          />
         
// };
// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'type', headerName: 'Type', width: 130 },
//     { field: 'date', headerName: 'Date', width: 130 , sortable: false},
//     { field: 'desc', headerName: 'Description', width: 130 },
//     {
//       field: 'amount',
//       headerName: 'Amount',
//       type: 'number',
//       width: 130
//     },
//     { field: 'category', headerName: 'Category', width: 130 },
//     { field: 'division', headerName: 'Description', width: 130 }
//     // {
//     //   field: "edit",
//     //   headerName: "Edit",
//     //   sortable: false,
//     //   width: 140,
//     //   disableClickEventBubbling: true,
//     //   renderCell: (params) => {
//     //       return (
//     //           <div  style={{ cursor: "pointer" }}>
//     //               <Edit index={params.row.id} />
//     //            </div>
//     //       );
//     //    }
//     // }
    
//   ];
  



// export function Report(){
    
//     const [amtData,setAmtData]= useState([]);

//     const incomeArray = amtData.filter(x=>x.type ==='Income');
//     const incomeTotal = incomeArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

//     const expenseArray = amtData.filter(x=>x.type ==='Expense');
//     const expenseTotal = expenseArray.map(x =>x.amount).reduce((a,b)=>a+b,0);

    
//     console.log(`incomeTotal`,incomeTotal)
//     console.log(`income`,incomeArray)
//     console.log(`expense`,expenseArray)
//     console.log(`expensetotal`,expenseTotal)
    
  
//     // const getAmt = async () =>{
//     //     await fetch(`${API}/track`,{
//     //         method : 'GET'
//     //     })
//     //     .then(response => response.json())
//     //     .then( res =>{
//     //      console.log(res);
//     //       setAmtData(res);
//     //     })
//     //     .catch( err => console.log(err));
//     // }
    
//     useEffect(()=>{
//       async function getAmt(){
//         await fetch(`${API}/track`,{
//             method : 'GET'
//         })
//         .then(response => response.json())
//         .then( res =>{
//          console.log(res);
//          for(let i=0;i<res.length;i++){
//            res[i].id= i+1;
//          }
//           setAmtData(res);
//         })
//         .catch( err => console.log(err));
//     }
//     getAmt()
//     },[])
    
//     return(
//       <div className='report'>
//         <div className='dataTable'>
//             <div style={{ height: 400, width: '100%',textAlign: "center" }}>
//             <DataGrid
//             getRowId={(r) => r._id}
//             rows={amtData}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
            
//             />
//             </div>
//         </div> 
        
//         <div className='sum'>
//           {/* .toLocaleString('en-IN') is used to convert the number to Indian Metric system */}
//           <Button style={{ textTransform : 'none'}} variant="outlined" className='totalbtn' color='success'>Income Total<br /> {incomeTotal.toLocaleString('en-IN')}</Button>
//           <Button style={{ textTransform : 'none'}}variant="outlined" className='totalbtn' color='error'>Expense Total<br /> {expenseTotal.toLocaleString('en-IN')}</Button>
//         </div>
//       </div>
        

//     )
// }

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
    
  
    // const getAmt = async () =>{
    //     await fetch(`${API}/track`,{
    //         method : 'GET'
    //     })
    //     .then(response => response.json())
    //     .then( res =>{
    //      console.log(res);
    //       setAmtData(res);
    //     })
    //     .catch( err => console.log(err));
    // }
    
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Type&nbsp;(g)</TableCell>
            <TableCell align="right">Date&nbsp;(g)</TableCell>
            <TableCell align="right">Description&nbsp;(g)</TableCell>
            <TableCell align="right">Amount&nbsp;(g)</TableCell>
            <TableCell align="right">Category&nbsp;(g)</TableCell>
            <TableCell align="right">Division&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {amtData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export {Report};