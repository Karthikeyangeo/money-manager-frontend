import React,{useState} from 'react';
import './App.css';
import Paper from '@mui/material/Paper';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory, Switch, Route } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {NotFound} from './routes/NotFound';
import { AddIncome} from './routes/AddIncome';
import {Report} from './routes/Report'
import {AddExpense} from './routes/AddExpense';
import {MaterialUIPickers} from './routes/date'

function App() {

  const [appMode,setAppMode] = useState('light');
  const history = useHistory();
  const theme = createTheme({
    palette: {
      mode: appMode,
    }
  });
  const paperStyles = { borderRadius : 0 , minHeight: "100vh"}

  return (

    <ThemeProvider theme={theme}>
    <Paper elevation={3} style={paperStyles}>
    <div className="App">
    <AppBar position="static">
      <Toolbar>
      <IconButton
            variant="text"
            size="small"
            color="inherit"
            aria-label="Home"
            sx={{ mr: 2 }}
            onClick = {()=> history.push('/')}
          >
            Home
          </IconButton>

          <IconButton
            variant="text"
            size="small"
            color="inherit"
            aria-label="Add Income"
            sx={{ mr: 2 }}
            onClick = {()=> history.push('/addIncome')}
          >
            Add Income
          </IconButton>
          <IconButton
            variant="text"
            size="small"
            color="inherit"
            aria-label="Add Expense"
            sx={{ mr: 2 }}
            onClick = {()=> history.push('/addExpense')}
          >
            Add Expense
          </IconButton>
          <IconButton
            variant="text"
            size="small"
            color="inherit"
            aria-label="Report"
            sx={{ mr: 2 }}
            onClick = {()=> history.push('/report')}
          >
            Report
          </IconButton>
          
          <IconButton
            variant="text"
            size="small"
            color="inherit"
            aria-label="Mode"
            sx={{ mr: 2 }}      
            style={{marginLeft:"auto"}}    
            onClick = { ()=> setAppMode(appMode === 'dark' ? 'light':'dark')}
          >
            {appMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} Mode
          </IconButton>
          
        </Toolbar>
      </AppBar>
      
      <Switch>
          {/* Each route is case, eg. - case '/about': */}
        
        <Route path="/addIncome">
          <AddIncome />  
        </Route>
        <Route path="/addExpense">
          {/* Matcht url display the below component */}
          <AddExpense />
        </Route>
        <Route path="/report">
          <Report />
        </Route>
        <Route path="/date">
          <MaterialUIPickers />
        </Route>
       
        <Route exact path ="/">
          <div className="home-page-content">
            <h1>Welcome to the Money Manager</h1> 
            <img className='home-page-img' alt='Money Management Pic' src ="https://www.edelweiss.in/ewwebimages/WebImages/Insights/Money_Management~e58f3670-ba50-4eb2-bcd7-334e3486efb6.jpg" />
          </div>
        </Route>

        <Route path="**">
          <NotFound />
        </Route>

      </Switch>
     
    </div>
    </Paper>
    </ThemeProvider>
  );
}

export default App;
