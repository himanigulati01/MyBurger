import React , {Component} from 'react';
import Aux from '../Auxilliary/Auxilliary'
import classes from './layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component{
    state={
        sideDrawer:false
    }
   toggleSideDrawerHandler = () =>{
    //    let checkSideDrawer = this.state.sideDrawer;
    //    if(checkSideDrawer){
    //        checkSideDrawer = false
    //    }
       this.setState((prevState)=>{
           return{sideDrawer: !prevState.sideDrawer}
       })
   }
    render(){
        return(
            <Aux>
                <div>
                    <Toolbar 
                        isAuthenticated = {this.props.isAuth !== null}
                        openSideDrawer={this.toggleSideDrawerHandler}/>
                    <SideDrawer 
                        isAuthenticated = {this.props.isAuth !== null}
                        show={this.state.sideDrawer} 
                        closed={this.toggleSideDrawerHandler}/>
                </div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapPropsToState = state => {
    return{
        isAuth : state.auth.token
    }
}
export default connect(mapPropsToState)(Layout);