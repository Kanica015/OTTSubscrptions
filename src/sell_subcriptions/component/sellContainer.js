import React from 'react';
import Radio from '@react/react-spectrum/Radio';
import RadioGroup from '@react/react-spectrum/RadioGroup';
import SubscriptionsFormToSell from './subscriptionsFormToSell';

class sellContainer extends React.Component{

    state = {
        subscriptionChannel : null,
    };

    handleStateChange = (evt) => {
        this.setState({subscriptionChannel : evt});
    };

    render() {
        return (
            <div>
                <h2> Please enter details for selling subscription</h2>
                <div className="radioGroup">
                    <RadioGroup name="radio-group" onChange={e => this.handleStateChange(e)}>
                        <Radio label="Netflix" value="netflix"/>
                        <Radio label="Hotstar" value="hotstar"/>
                        <Radio label="Sony Liv" value="sonyLiv"/>
                        <Radio label="Amazon Prime" value="amazon" on/>
                        <Radio label="Zee5" value="zee5" on/>
                    </RadioGroup>
                </div>
                {!this.state.subscriptionChannel ? '' :
                    <div className="subscriptionForm">
                    <SubscriptionsFormToSell subscriptionChannelName={this.state.subscriptionChannel}/>
                    </div>
                }
            </div>
        );
    }
}

export default sellContainer;