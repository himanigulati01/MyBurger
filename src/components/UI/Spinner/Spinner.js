import React, { Component } from 'react';

import classes from '../Spinner/Spinner.css'

class spinner extends Component{
   
    render(){ 
    return(
        <div className={classes.Loader}>Loading...</div>
    )}
}

export default spinner;