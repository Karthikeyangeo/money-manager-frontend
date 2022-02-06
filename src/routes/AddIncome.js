import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from  "formik";
import * as yup from 'yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function BasicDateTimePicker() {
  const [date, setDate] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <DateTimePicker
      className='date'
        id="date"
        name="date"
        renderInput={(props) => <TextField {...props} sx={{width: '30%'}}/>}
        label="Date Time"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
const formValidationSchema = yup.object({
    desc: yup.string().required("Mandatory Field").min(5,"please tell us more").max(15,"Max char value is 15"),
    amount : yup.number().required("Mandatory Field"),
    date : yup.date().required("Mandatory Field")
  })

export function AddIncome(){

    const {handleSubmit,values,handleBlur,handleChange,errors,touched} = useFormik({
        initialValues:{desc:"",value:""},
        validationSchema:formValidationSchema,
        onSubmit:(result)=>{
         console.log(result)
        }
      })

   
    const history = useHistory();
    const new_style = { width: '30%' };
    return(
        
        <form onSubmit={handleSubmit}>
        <div className="addExpense">
        <h1 className='h1-addIncome'>Add Income</h1>
        <TextField
            id="desc"
            name="desc"
            value={values.desc}
            onChange={handleChange}
            label="Description"
            variant="outlined"
            onBlur={handleBlur}
            style={new_style} 
            error={errors.desc && touched.desc}
            helperText = {errors.desc && touched.desc ? errors.desc : ""}/>
        
          <TextField
            id="amount"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            label="Amount"
            variant="outlined"
            onBlur={handleBlur}
            style={new_style} 
            error={errors.amount && touched.amount}
            helperText = {errors.amount && touched.amount ? errors.amount : ""}/>
         
          <BasicDateTimePicker />
          
          {/* Using button from Material  */}
      <Button variant="contained" type="submit" style={new_style} className="formButton">Add Income</Button>
        </div>
        </form>
    )

}

