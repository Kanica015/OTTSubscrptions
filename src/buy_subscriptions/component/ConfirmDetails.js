import React from 'react';
import {Form, FormItem} from "@react/react-spectrum/Form";
import Checkbox from "@react/react-spectrum/Checkbox";
import TextField from "@react/react-spectrum/Textfield";
import Button from "@react/react-spectrum/Button";

class ConfirmDetails extends React.Component{

    state = {
        isChecked : false,
        emailAddress : null,
        confirmEmailAddress: null,
        isValidEmail : false
    }

    validateOnChange = (evt) => {
        this.setState({isChecked : evt})
    }

    handleEmailAddress = (value) => {
        this.setState({emailAddress : value})
        let isValid = this.isValidEmail(this.state.emailAddress, this.state.confirmEmailAddress);
        this.setState({isValidEmail : isValid});
    }

    handleConfirmEmailAddress = (value) => {
        this.setState({confirmEmailAddress : value});
        let isValid = this.isValidEmail(this.state.emailAddress, this.state.confirmEmailAddress);
        this.setState({isValidEmail : isValid});
    }

    isValidEmail = (email, confirmEmail) => {
        if(email && confirmEmail) {
            return email===confirmEmail ? true : false;
        }
        return false;
    }

    submitDetails = () => {

    }

    render() {
        return (
            <Form aria-labelledby="standard-form">
                <FormItem label="Enter Your Email Address">
                    <TextField placeholder="Enter email address" name="emailAddress"
                               onChange={e => this.handleEmailAddress(e)} />
                </FormItem>
                <FormItem label="Enter Email Again to Confirm">
                    <TextField placeholder="Enter email to confirm" name="confirmEmailAddress"
                               onChange={e => this.handleConfirmEmailAddress(e)} />
                </FormItem>
                <Checkbox label="Accept Term & Conditions to Proceed"
                          onChange={(evt) => this.validateOnChange(evt)}/>
                <Button variant={'action'} disabled={!this.state.isChecked && !this.state.isValidEmail}
                        onClick={() => this.submitDetails()}> Submit your Request </Button>
            </Form>
        );
    }
}

export default ConfirmDetails;