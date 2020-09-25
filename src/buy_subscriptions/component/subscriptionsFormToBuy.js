import React from 'react';

import {Form, FormItem} from '@react/react-spectrum/Form';
import TextField from '@react/react-spectrum/Textfield';
import Button from '@react/react-spectrum/Button';
import Datepicker from "@react/react-spectrum/Datepicker";

class subscriptionsForm extends React.Component {

    state = {
        noOfDays : 0,
        subscriptionChannelName : this.props.subscriptionChannelName,
        noOfConnections : 0

    }

    handleFormData = (value) => {
        this.setState({noOfDays : value});
    }

    handleNumberOfConnections = (value) => {
        this.setState({noOfConnections : value})
    }

    onClickSave = () => {
        //validate
        this.validateDetails();
        //save details
    }

    onClickCancel = () => {

    }

    validateDetails = () => {

    }

    render() {
        return (
            <div>
                <Form aria-labelledby="standard-form">
                    <FormItem label="Number of Days :">
                        <TextField placeholder="Enter number of days" name="noOfDays"
                                   onChange={e => this.handleFormData(e.value)} />
                    </FormItem>
                    <FormItem label="Number of Connections :">
                        <TextField placeholder="Enter number of days" name="noOfDays"
                                   onChange={e => this.handleNumberOfConnections(e.value)} />
                    </FormItem>
                    <FormItem label="Start Date :">
                        <Datepicker value="today" aria-label="Date" onChange={this.handleStartDate} />
                    </FormItem>
                    <Button variant={'action'} onClick={this.onClickCancel}> Edit Form Data </Button>
                    <Button variant={'action'} onClick={this.onClickSave}> Enter Connection Details </Button>
                </Form>
            </div>
        );
    }

}

export default subscriptionsForm;