import * as React from 'react';
import { useState ,useEffect} from 'react';
import {API} from './global';
import { DataGrid } from '@mui/x-data-grid';

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
  
  const rows = [
    {
      type: "type 1",
      date: "date 1",
      desc: "desc 1",
      division: "division 1",
      category: "category 1",
      amount: 1000,
      id: "1"
    },
    {
      type: "type 2",
      date: "date 2",
      desc: "desc 2",
      division: "division 2",
      category: "category 2",
      amount: 9,
      id: "2"
    },
    {
      type: "type 3",
      date: "date 3",
      desc: "desc 3",
      division: "division 3",
      category: "category 3",
      amount: 1,
      id: "3"
    },
    {
      type: "type 4",
      date: "date 4",
      desc: "desc 4",
      division: "division 4",
      category: "category 4",
      amount: 61,
      id: "4"
    },
    {
      type: "type 5",
      date: "date 5",
      desc: "desc 5",
      division: "division 5",
      category: "category 5",
      amount: 27,
      id: "5"
    },
    {
      type: "type 6",
      date: "date 6",
      desc: "desc 6",
      division: "division 6",
      category: "category 6",
      amount: 31,
      id: "6"
    },
    {
      type: "type 7",
      date: "date 7",
      desc: "desc 7",
      division: "division 7",
      category: "category 7",
      amount: 78,
      id: "7"
    },
    {
      type: "type 8",
      date: "date 8",
      desc: "desc 8",
      division: "division 8",
      category: "category 8",
      amount: 63,
      id: "8"
    },
    {
      type: "type 9",
      date: "date 9",
      desc: "desc 9",
      division: "division 9",
      category: "category 9",
      amount: 48,
      id: "9"
    },
    {
      type: "type 10",
      date: "date 10",
      desc: "desc 10",
      division: "division 10",
      category: "category 10",
      amount: 31,
      id: "10"
    }
  ];


export function Report(){
    
    const [amtData,setAmtData]= useState([]);


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
        <div className='dataTable'>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            
            />
            </div>
        </div>

    )
}