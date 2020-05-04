import React, {Component} from "react";

import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

class Widget extends Component{
    render() {
        return (
            <div>
                <Cpu/>
                <Mem/>
                <Info/>
            </div>
        );
    }
}

export default Widget;