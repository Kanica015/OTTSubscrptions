import React from 'react';
import './App.css';
import {TabView, Tab} from '@react/react-spectrum/TabView';
import BuyContainer from './buy_subscriptions/component/buyContainer';
import SellContainer from './sell_subcriptions/component/sellContainer'
import { Provider } from 'mobx-react';
import SpectrumProvider from "@react/react-spectrum/Provider";

function App() {
    return (
        <SpectrumProvider className="spectrum-provider" theme="light" scale="large" >
        <Provider>
            {/*<div className="App">*/}
                <TabView className="AppContainerTabs">
                    <Tab label="Buy Subscriptions">
                        <BuyContainer />
                    </Tab>
                    <Tab label="Sell Subscriptions">
                        <SellContainer />
                    </Tab>
                </TabView>

          {/*  </div>*/}
        </Provider>
        </SpectrumProvider>
  );
}

export default App;
