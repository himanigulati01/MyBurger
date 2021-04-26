import Button from '../../components/UI/Button/Button'
import React, {Component} from 'react';
import classes from './ContactData.css'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
//import { withRouter } from 'react-router-dom';
import Input from '../../components/UI/Input/Input'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import {updatedObject, checkValidity} from '../../shared/utility'

class contactData extends Component{
	state = {
		orderForm: {
			name: {
				elementType:'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
	
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
	
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIPCODE'
				},
				value: '',
				validation: {
					required: true,
					minlength:5,
					maxlength:5
				},
				valid: false,
				touched: false
			},
	
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options:[
						{value: 'fastest',displayValue: 'Fastest'},
						{value: 'cheapest',displayValue: 'Cheapest'}]
				},
				value: 'fastest',
				valid: true,
				validation:{}
			},
		},
		formIsValid: false,
	  
		
	}
	componentDidMount(){  
		
	}

	

	orderHandler = ( event ) => {
		event.preventDefault()
		const formData = {}
		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData,
			userId : this.props.userId
		}
	   
		this.props.onOrderBurger(order, this.props.token)
	}

	inputChangeHandler(event, inputIdentifier){
		
		const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier],{
		    value: event.target.value,
			valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched: true
		})

		const updatedOrderForm = updatedObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
		})
		
		let formIsValid = true
		for(let inputIdentifier in updatedOrderForm){
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid        
			}
		//console.log(updatedFormElement)
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid })
	}
	
	render() {
		const formElementArray= []
		for (let key in this.state.orderForm){
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key] 
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
					{formElementArray.map(formElement =>(
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
					))}
					<Button  btn = 'Success' disabled = {!this.state.formIsValid}>Order</Button>
			</form>
		)
		if (this.props.loading){
			form = <Spinner/>
		}
		

		return(
			<div className = { classes.ContactData }>
				<h2>Enter Contact Details</h2>
				{ form }
			</div>
		)
	}
}

const mapStateToProps = state => {
		return{
			ings : state.burgerBuilder.ingredients,
			price : state.burgerBuilder.totalPrice,
			loading : state.order.loading,
			token: state.auth.token,
			userId: state.auth.userId
		}
}


const mapDispatchToProps = dispatch => {
	return{
		onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios))