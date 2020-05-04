import React, {Component} from 'react';

import Widget from './Widget';
import socket from "../utils/socketConnection";

class App extends Component {
    state = {
        performanceData: {}
    };


    componentDidMount() {
        socket.on('data', data => {});
    }

    render() {
        return (
            <div>
                <Widget/>
            </div>
        );
    }
}

export default App;
