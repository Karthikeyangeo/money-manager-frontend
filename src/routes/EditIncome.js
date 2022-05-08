import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from  "formik";
import * as yup from 'yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker  from '@mui/lab/DesktopDatePicker';
import {API} from './global';
import { useHistory ,useParams} from 'react-router-dom';
import AddCardIcon from '@mui/icons-material/AddCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// function BasicDateTimePicker() {
 

//   return (
    
//   );
// }
const formValidationSchema = yup.object({
    desc: yup.string().required("Mandatory Field").min(5,"please tell us more").max(15,"Max char value is 15"),
    amount : yup.number().required("Mandatory Field")
    
  })

export function EditIncome(){
    const {id} =useParams();
    const [selectedIncome,setSelectedIncome]= useState(null);

    
    useEffect( ()=>{
        async function getIncome(){
            await fetch(`${API}/track/${id}`,{
                method:'GET'
            })
            .then((data)=>data.json())
            .then((selecteddata)=> setSelectedIncome(selecteddata))
        }
        getIncome()        
    },[]);
  
    console.log('SelectedIncome',selectedIncome);
    return selectedIncome ? <UpdateIncome selectedIncome={selectedIncome} /> 
                          :<Backdrop
                              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                              open>
                              <CircularProgress color="inherit" />
                            </Backdrop>
                          
                          ;
    
}


function UpdateIncome(selectedIncome){
   
    console.log('success',selectedIncome)
   
    const formik = useFormik({
        initialValues:{
            desc:selectedIncome.desc,
            amount:selectedIncome.amount,
            date:selectedIncome.date,
            displayDate:selectedIncome.displayDate,
            category:null,
            division:null,
            type:"Income"
        },
        // enableReinitialize:true,
        validationSchema:formValidationSchema,
        onSubmit:(result)=>{

          // change the date format
          let d =  result.date ;
          result.displayDate = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
          
          //checking if any white space is there in amount and removing ;converting the string to number
          let n = result.amount;
          result.amount = n.replace(/\s/g, "");
          result.amount = parseFloat(result.amount);

          console.log(result);
          editIncomeDetails(result);
        }
      })
    
    const new_style = { width: '30%' };
    const [dateState, setDateState] = React.useState(selectedIncome.date);
    const dateHandleChange = (newValue) => {
      setDateState(newValue);
      formik.setFieldValue(`date`,newValue);
    };

    const history = useHistory();

    const editIncomeDetails = (updIncome) =>{

      fetch(`${API}/track/${selectedIncome._id}`,{
        method : "PUT",
        body : JSON.stringify([updIncome]),
        headers : {'content-type':'application/json'}
      })
      .then(()=> history.push(`/table`))
    }


    return(
     
        <form onSubmit={formik.handleSubmit}>
        <div className="addExpense">
        <div className='income_title'>
          <h1 className='h1-addIncome'>Edit Income </h1>
          <AddCardIcon className='incomeIcon'fontSize='large'/>
        </div>
        
        <TextField
            id="desc"
            name="desc"
            defaultValue={formik.values.desc}
            onChange={formik.handleChange}
            label="Description"
            variant="outlined"
            onBlur={formik.handleBlur}
            style={new_style} 
            error={formik.errors.desc && formik.touched.desc}
            helperText = {formik.errors.desc && formik.touched.desc ? formik.errors.desc : ""}/>
        
          <TextField
            id="amount"
            name="amount"
            defaultValue={formik.values.amount}
            onChange={formik.handleChange}
            label="Amount"
            variant="outlined"
            onBlur={formik.handleBlur}
            style={new_style} 
            error={formik.errors.amount && formik.touched.amount}
            helperText = {formik.errors.amount && formik.touched.amount ? formik.errors.amount : ""}/>
         
      <LocalizationProvider dateAdapter={AdapterDateFns}>

            <DesktopDatePicker
              className='date'
              id="date"
              name="date"
              label="Date"
              variant="outlined"
              inputFormat="MM/dd/yyyy"
              value={dateState}
              style={new_style} 
              onBlur={formik.handleBlur}
              renderInput={(params) => <TextField {...params} sx={new_style}/>}
              onChange={dateHandleChange} 
              error={formik.errors.date && formik.touched.date}
              helperText = {formik.errors.date && formik.touched.date ? formik.errors.date : ""}
            />
            </LocalizationProvider>
         
          
          {/* Using button from Material  */}
      <Button variant="contained" type="submit" style={new_style} className="formButton">Save Income</Button>
        </div>
        </form>       
        
    )

}
