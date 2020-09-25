import React from 'react';
import {Form, FormItem} from "@react/react-spectrum/Form";
import TextField from "@react/react-spectrum/Textfield";
import SellStore from "./../store/sellStore"

class PaymentDetails extends React.Component {

    state = {
        accountNumber : null,
        ifscCode : null
    }

    handleAccountNumber = (value) => {
        this.setState({accountNumber : value});
    }

    handleIfscCodeNumber = (value) => {
        this.setState({ifscCode : value});
    }

    render() {
        return (
            <div>
                <Form aria-labelledby="standard-form">
                    <FormItem label="Credit Card Number">
                        <TextField placeholder="Account number" name="cardNumber"
                                   onChange={e => this.handleAccountNumber(e)} />
                    </FormItem>
                    <FormItem label="Credit Card CVV">
                        <TextField placeholder="IFSC Code" name="ifscCode"
                                   onChange={e => this.handleIfscCodeNumber(e)} />
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default PaymentDetails;