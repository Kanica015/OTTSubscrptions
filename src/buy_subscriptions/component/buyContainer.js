import React from 'react';
import RadioGroup from '@react/react-spectrum/RadioGroup';
import Radio from '@react/react-spectrum/Radio';
import Button from "@react/react-spectrum/Button";
import PaymentDetails from './PaymentDetails';
import ConfirmDetails from './ConfirmDetails';
import {Form, FormItem} from "@react/react-spectrum/Form";
import Datepicker from "@react/react-spectrum/Datepicker";
import SubscriptionsList from "./SubscriptionsList";
import {observer} from 'mobx-react';
import buyStore from './../store/buyStore';

@observer
class buyContainer extends React.Component{

    state = {
        activeState : 'radio',
        subscriptionChannel : null,
        subscriptionDays : 0,
        startDate : null,
        endDate : null,
        isValid : true
    };

    componentDidMount() {

    }

    handleStateChange = (evt) => {
        this.setState({subscriptionChannel : evt});
        buyStore.ottName = this.state.subscriptionChannel;
    }

    viewPrevStep = () => {
        let step = this.state.activeState;
        let currentStep = this.getNextStepFromCurrentStep(step, false);
        if (currentStep)
            this.setState({activeState : currentStep});
    }

    viewNextStep = () => {
        if(this.validateDetails())
            return;
        let step = this.state.activeState;
        let currentStep = this.getNextStepFromCurrentStep(step, true);
        if (currentStep)
            this.setState({activeState : currentStep});
    }

    getNextStepFromCurrentStep = (step, isForwardOrder) => {
        switch (step) {
            case 'radio' :
                return isForwardOrder ? 'connection' : step;
                break;
            case 'connection':
                return isForwardOrder ? 'payment' : 'radio';
                break;
            case 'payment':
                return isForwardOrder ? 'email' : 'connection';
                break;
            case 'email':
                return  isForwardOrder ? step : 'payment';
                break;
            default:
                return null;
                break;
        }
    }

    handleStartDate = (evt) => {
        this.setState({startDate : evt});
        buyStore.startDate = this.state.startDate;
        this.validateDetails();
    }

    handleEndDate = (evt) => {
        this.setState({endDate : evt});
        buyStore.endDate = this.state.endDate;
        this.validateDetails();
    }

    validateDetails = () => {
        /*if (this.state.startDate && this.state.endDate){
            if(this.state.startDate < this.state.endDate) {
                this.setState({isValid : true})
                return false;
            }
        }
        this.setState({isValid : false})
        return true;*/
    }

    render() {
        return (
            <div>
                <h2> Fill up the details for the buyers </h2>
                <hr />
                {this.state.activeState === 'radio' ?
                    <div>
                        <div className="radioGroup">
                            <RadioGroup name="radio-group" defaultSelectedValue={"netflix"} onChange={e => this.handleStateChange(e)}>
                                <Radio label="Netflix" value="netflix" />
                                <Radio label="Hotstar" value="hotstar" />
                                <Radio label="Sony Liv" value="sonyLiv" />
                                <Radio label="Zee5" value="zee5" />
                            </RadioGroup>
                        </div>
                        <Form aria-labelledby="standard-form">
                            <FormItem label="Start Date :">
                                <Datepicker aria-label="Date"
                                            onChange={this.handleStartDate} />
                            </FormItem>
                            <FormItem label="End Date :">
                                <Datepicker aria-label="Date"
                                            onChange={this.handleEndDate} />
                            </FormItem>
                        </Form>
                    </div> : <div />}
                {this.state.activeState === 'connection' ?
                    <div className="subscriptionsList">
                        <SubscriptionsList ottName={this.state.subscriptionChannel}
                                           startDate={this.state.startDate}
                                           endDate={this.state.endDate} />
                    </div> : <div />}
                { this.state.activeState === 'payment' ?
                    <div className="paymentOptions">
                        <PaymentDetails subcriptionChannelName={this.state.subscriptionChannel}
                                        connections={this.state.connections}
                                        noOfDays/>
                    </div> : <div />}
                { this.state.activeState === 'email' ?
                    <div className="email">
                        <ConfirmDetails />
                    </div> : <div />}
                <br />
                {<div>
                    <Button variant={'action'} disabled={this.state.activeState === 'radio'}
                         onClick={() => this.viewPrevStep()}> Previous Step </Button>
                    <Button variant={'action'} disabled={this.state.activeState === 'email' || !this.state.isValid}
                        onClick={() => {this.viewNextStep()}}> Next Step </Button>
                </div>}
            </div>
        );
    }
}

export default buyContainer;