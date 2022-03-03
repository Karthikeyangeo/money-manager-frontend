import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from  "formik";
import * as yup from 'yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker  from '@mui/lab/DesktopDatePicker';
import {API} from './global';
import { useHistory } from 'react-router-dom';

// function BasicDateTimePicker() {
 

//   return (
    
//   );
// }
const formValidationSchema = yup.object({
    desc: yup.string().required("Mandatory Field").min(5,"please tell us more").max(15,"Max char value is 15"),
    amount : yup.number().required("Mandatory Field")
    
  })

export function AddIncome(){

    const formik = useFormik({
        initialValues:{desc:"",amount:"",date:new Date(),type:"income"},
        validationSchema:formValidationSchema,
        onSubmit:(result)=>{

          // change the date format
          let d =  result.date ;
          result.date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
          
          //checking if any white space is there in amount and removing 
          let n = result.amount;
          result.amount = n.replace(/\s/g, "");

          console.log(result);
         addIncomeDetails(result);
        }
      })
    
    const new_style = { width: '30%' };
    const [dateState, setDateState] = React.useState(new Date());
    const dateHandleChange = (newValue) => {
      setDateState(newValue);
      formik.setFieldValue(`date`,newValue);
    };

    const history = useHistory();

    const addIncomeDetails = (newIncome) =>{

      fetch(`${API}/track`,{
        method : "POST",
        body : JSON.stringify([newIncome]),
        headers : {'content-type':'application/json'}
      })
      .then(()=> history.push(`/report`))
    }


    return(
     
        <form onSubmit={formik.handleSubmit}>
        <div className="addExpense">
        <h1 className='h1-addIncome'>Add Income</h1>
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
      <Button variant="contained" type="submit" style={new_style} className="formButton">Add Income</Button>
        </div>
        </form>
        
        
    )

}
