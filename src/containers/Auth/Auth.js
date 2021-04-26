import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from '../Auth/Auth.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
import {updatedObject, checkValidity} from '../../shared/utility'


class Auth extends Component{
    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minlength : 6   
                },
                valid: false,
                touched: false
            }
        },
        isSignUp : true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
          this.props.onSetAuthPathHandler();
        }
      }
    
    inputChangeHandler = (event, controlName) =>{
        const updatedControls = updatedObject(this.state.controls,{
            [controlName]:updatedObject(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        })
        this.setState({controls:updatedControls})
    }
    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return{isSignUp: !prevState.isSignUp}
        })
    }

    submitHandler = (event) =>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render(){
        const formElementsArray= []
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key] 
            })
        }

        const form = formElementsArray.map(formElement=>(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                                //valueType={formElement.config.}
                changed={(event)=>this.inputChangeHandler(event,formElement.id)}
            />
        ))

        if(this.props.loading){
            return(
                <Spinner/>
            )
        }
        let errorMessage = null
        if(this.props.error){
            errorMessage = (
                <p style={{color: "red"}}>{this.props.error.message}</p>
            )
        }
        
        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btn='Success'>SUBMIT</Button>
                </form>
                
                <Button
                    btn='Danger'
                    clicked={this.switchAuthModeHandler}>
                        SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthPathHandler : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);