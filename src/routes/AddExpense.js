import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from  "formik";
import * as yup from 'yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker  from '@mui/lab/DesktopDatePicker';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useHistory } from 'react-router-dom';
import {API} from './global';


const formValidationSchema = yup.object({
    desc: yup.string().required("Mandatory Field").min(5,"please tell us more").max(15,"Max char value is 15"),
    amount : yup.number().required("Mandatory Field").positive(),
    category:yup.string().required("Mandatory Field"),
    division: yup.string().required("Mandatory Field")
  })

export function AddExpense(){

    const formik = useFormik({
      initialValues:{desc:"",amount:"",date:new Date(),category:"",division:"",type:"Expense"},
      validationSchema:formValidationSchema,


      onSubmit:(result)=>{

      // change the date format
      let d =  result.date ;
      result.date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;

      //checking if any white space is there in amount and removing ; converting the string to number
      let n = result.amount;
      result.amount = n.replace(/\s/g, "");
      result.amount = parseFloat(result.amount);
      
      console.log((result))
      addExpenseDetails(result);
      }
    })
  
  const new_style = { width: '30%' };
  const [dateState, setDateState] = React.useState(new Date());
  const [category,setCategory] = React.useState('');
  const [division,setDivision] = React.useState('');
  
  const dateHandleChange = (newValue) => {
    setDateState(newValue);
    formik.setFieldValue(`date`,newValue);
  };

  const categoryHandleChange = (event) => {
    setCategory(event.target.value);
    formik.setFieldValue(`category`,event.target.value);
  };

  const divisionHandleChange = (event) => {
    setDivision(event.target.value);
    formik.setFieldValue(`division`,event.target.value);
  };

  const history = useHistory();

  const addExpenseDetails =(newExpense)=>{

    fetch(`${API}/track`,{
      method: 'POST',
      body : JSON.stringify([newExpense]),
      headers : {'content-type':'application/json'}
    })
    .then(()=>history.push(`/report`));
  }

    return(
        
        <form onSubmit={formik.handleSubmit}>
        
        <div className="addExpense">
            <div className='expense-header'>
            <h1 className='h1-addExpense'>Add Expense</h1>
            <RemoveCircleOutlineOutlinedIcon fontSize='large' />
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

            <FormControl >
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={category}
                label="Category"
                name="category"
                onChange={categoryHandleChange}
                onBlur={formik.handleBlur}
                style={new_style} 
                error={formik.errors.category && formik.touched.category}
                
              >
              
                <MenuItem value={'Fuel'}>Fuel</MenuItem>
                <MenuItem value={'Movie'}>Movie</MenuItem>
                <MenuItem value={'Food'}>Food</MenuItem>
                <MenuItem value={'Loan'}>Loan</MenuItem>
                <MenuItem value={'Medical'}>Medical</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
              <FormHelperText>{formik.errors.category && formik.touched.category ? formik.errors.category : ""}</FormHelperText>
            </FormControl>
          

            <FormControl >
              <InputLabel id="division">Division</InputLabel>
              <Select
                labelId="division"
                id="division"
                value={division}
                label="Division"
                name="division"
                onChange={divisionHandleChange}
                onBlur={formik.handleBlur}
                style={new_style} 
                error={formik.errors.division && formik.touched.division}
              >
                <MenuItem value={'Personal'}>Personal</MenuItem>
                <MenuItem value={'Office'}>Office</MenuItem>
              </Select>
              <FormHelperText>{formik.errors.division && formik.touched.division ? formik.errors.division : ""}</FormHelperText>
            </FormControl>
           
          
          {/* Using button from Material  */}
      <Button variant="contained" type="submit" style={new_style} className="formButton">Add Expense</Button>
        </div>
        </form>
    )

}

