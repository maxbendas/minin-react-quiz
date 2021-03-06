import React, {Component} from 'react';
import classes from './Auth.module.scss';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from "axios";

// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email:
                {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Enter the correct email',
                    valid: 'false',
                    touched: 'false',
                    validation: {
                        required: true,
                        email: true
                    }
                },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter the correct password',
                valid: 'false',
                touched: 'false',
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }
    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken:true
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCXhWGHgoyPaS--SSPciIvAhHmFNsBi9w', authData)
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }
    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken:true
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCXhWGHgoyPaS--SSPciIvAhHmFNsBi9w', authData)
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }
    submitHandler = (e) => {
        e.preventDefault()
    }


    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid

    }

    onChangeHandler = (e, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = e.target.value
        control.tuched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            return isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    shouldValidate={!!control.validation}
                    {...control}
                    onChange={(e) => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;