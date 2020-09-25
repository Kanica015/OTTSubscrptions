import React from 'react';
import {observer,action} from 'mobx-react';
import SellStore from '../store/sellStore';
import {Form, FormItem} from '@react/react-spectrum/Form';
import TextField from '@react/react-spectrum/Textfield';
import Button from '@react/react-spectrum/Button';
import Datepicker from "@react/react-spectrum/Datepicker";
import apiService from "./../../service/buyAndSellServices";
import PaymentDetails from "./PaymentDetails";
import ConfirmDetails from "./ConfirmDetails";
import Checkbox from "@react/react-spectrum/Checkbox";
import {Table, TH, THead} from "@react/react-spectrum/Table";
import PackageListBody from './PackageListBody';
import {ShowAllPackageListTableHeaders} from "./../../buy_subscriptions/constants/constants"

const subscriptionsFormToSell = observer(class subscriptionsFormToSell extends React.Component {

    state = {
        activeState : 'radio',
        subscriptionChannelName : this.props.subscriptionChannelName,
        startDate: new Date(),
        endDate: new Date(),
        isValid : true,
        isChecked : false,
        emailAddress : null,
        confirmEmailAddress: null,
        isValidEmail : false,
        username : null,
        password: null,
        accountNumber : null,
        ifscCode : null
    };

    validateOnChange = (evt) => {
        this.setState({isChecked : evt})
    };

    handleUsername = (value) => {
        this.setState({username : value})
    };

    handlePassword = (value) => {
        this.setState({password : value})
    };

    validateDetails = () => {
        SellStore.generateReport(this.state.username, '1234',2);
    };

    handleStartDate = (evt) => {
        this.setState({...this.state, startDate : evt});
        SellStore.setStartDate(evt);
    };
    handleEndDate = (evt) => {
        this.setState({...this.state, endDate : evt});
        SellStore.setEndDate(evt);
    };

    viewPrevStep = () => {
        let step = this.state.activeState;
        let currentStep = this.getNextStepFromCurrentStep(step, false);
        if (currentStep)
            this.setState({activeState : currentStep});
    };

    viewNextStep = () => {
        let step = this.state.activeState;
        let currentStep = this.getNextStepFromCurrentStep(step, true);
        if (currentStep)
            this.setState({activeState : currentStep});
    };

    showPackages = () => {
        SellStore.showPackages(this.state.subscriptionChannelName);
    };

    getNextStepFromCurrentStep = (step, isForwardOrder) => {
        switch (step) {
            case 'radio' :
                this.showPackages();
                return isForwardOrder ? 'package' : step;
                break;
            case 'package':
                return isForwardOrder ? 'payment' : 'radio';
                break;
            case 'payment':
                return isForwardOrder ? 'email' : 'package';
                break;
            case 'email':
                return  isForwardOrder ? step : 'payment';
                break;
            default:
                return null;
                break;
        }};

        handleAccountNumber = (value) => {
            this.setState({accountNumber : value});
        }

        handleIfscCodeNumber = (value) => {
            this.setState({ifscCode : value});
        }


    render() {
        return (
            <div>
                {this.state.activeState === 'radio' ?
                <div><Form aria-labelledby="standard-form">
                    <FormItem label="Start Date :">
                        <Datepicker value="today" aria-label="Date" onChange={this.handleStartDate} />
                    </FormItem>
                    <FormItem label="End Date :">
                        <Datepicker value="today" aria-label="Date" onChange={this.handleEndDate} />
                    </FormItem>
                </Form></div> : <div/>}
                {  this.state.activeState === 'package' ?
                    <Table>
                        <THead>{ShowAllPackageListTableHeaders.map((header, idx) => <TH key={idx}>{header}</TH>)}</THead>
                        <PackageListBody packageList={SellStore.packageList} />
                    </Table> : <Table/>
                }
                { this.state.activeState === 'payment' ?
                    <div>
                        <Form aria-labelledby="standard-form">
                            <FormItem label="Account Number">
                                <TextField placeholder="Account number" name="cardNumber"
                                           onChange={e => this.handleAccountNumber(e)} />
                            </FormItem>
                            <FormItem label="IFSC Code">
                                <TextField placeholder="IFSC Code" name="ifscCode"
                                           onChange={e => this.handleIfscCodeNumber(e)} />
                            </FormItem>
                        </Form>
                    </div> : <div />}
                { this.state.activeState === 'email' ?
                    <div className="email">
                        <Form aria-labelledby="standard-form">
                            <FormItem label="Enter OTT username">
                                <TextField placeholder="Enter user name" name="enterUsername"
                                           onChange={e => this.handleUsername(e)} />
                            </FormItem>
                            <FormItem label="Enter OTT Password">
                                <input type="password" placeholder="Enter password"
                                           onChange={e => this.handlePassword(e)} />
                            </FormItem>
                            <Checkbox label="Accept Term & Conditions to Proceed"
                                      onChange={(evt) => this.validateOnChange(evt)}/>
                            <Button variant={'action'} disabled={!this.state.isChecked || !this.state.username || !this.state.password}
                                    onClick={() => this.validateDetails()}> Submit your Request </Button>
                        </Form>
                    </div> : <div />}
                <br />
                {<div>
                    <Button variant={'action'} disabled={this.state.activeState === 'radio'}
                            onClick={() => this.viewPrevStep()}> Previous Step </Button>
                    <Button variant={'action'} disabled={this.state.activeState === 'email' || !this.state.isValid || (this.state.activeState === 'payment' && (!this.state.accountNumber || !this.state.ifscCode ))}
                            onClick={() => {this.viewNextStep()}}> Next Step </Button>
                </div>}
            </div>

        );
    }
})

export default subscriptionsFormToSell;