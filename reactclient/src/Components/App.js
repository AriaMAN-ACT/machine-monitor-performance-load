import React, {Component} from 'react';

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
                App
            </div>
        );
    }
}

export default App;
