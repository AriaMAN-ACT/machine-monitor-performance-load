import React, {Component} from 'react';

import Widget from './Widget';
import socket from "../utils/socketConnection";

class App extends Component {
    state = {};


    componentDidMount() {
        socket.on('data', data => {
            console.log(data);
            let state = {...this.state};
            state[data.macAddress] = data;
            this.setState(state);
        });
    }

    renderWidgets() {
        return Object.values(this.state)
            .map((performanceData, index) =>
                <Widget data={performanceData} key={performanceData.macAddress}/>);
    }

    render() {
        return (
            <div>
                {this.renderWidgets()}
            </div>
        );
    }
}

export default App;
