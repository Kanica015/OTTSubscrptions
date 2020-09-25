import React from 'react';
import {Form, FormItem} from "@react/react-spectrum/Form";
import TextField from "@react/react-spectrum/Textfield";

class PaymentDetails extends React.Component {

    state = {
        creditCardNumber : null,
        expiryDate : null,
        cvvNumber : null,
        cardHolderName : null
    }

    handleCreditCardNumber = (value) => {
        this.setState({creditCardNumber : value});
    }

    handleCreditCardCvvNumber = (value) => {
        this.setState({cvvNumber : value});
    }

    handleCreditCardExpiry = (value) => {
        this.setState({expiryDate : value});
    }

    handleCreditCardHolderName = (value) => {
        this.setState({cardHolderName : value});
    }

    render() {
        return (
            <div>
                <Form aria-labelledby="standard-form">
                    <FormItem label="Credit Card Number">
                        <TextField placeholder="credit card number" name="cardNumber"
                                   onChange={e => this.handleCreditCardNumber(e)} />
                    </FormItem>
                    <FormItem label="Credit Card CVV">
                        <TextField placeholder="credit card cvv" name="cvvNumber"
                                   onChange={e => this.handleCreditCardCvvNumber(e)} />
                    </FormItem>
                    <FormItem label="Credit Card Expiry">
                        <TextField placeholder="credit card expiry(mm/yy)" name="cardExpiry"
                                   onChange={e => this.handleCreditCardExpiry(e)} />
                    </FormItem>
                    <FormItem label="Credit Card Holder Name">
                        <TextField placeholder="credit card holder name" name="cardHolderName"
                                   onChange={e => this.handleCreditCardHolderName(e)} />
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default PaymentDetails;