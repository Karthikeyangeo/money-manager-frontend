import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {API} from './global';
import { DataGrid } from '@mui/x-data-grid';



export function Report(){
    // using useState hook to add movie data dynamically 
    const [data,setData] = useState([]);
    return(
        <div>{API}/track
        </div>
    )
}