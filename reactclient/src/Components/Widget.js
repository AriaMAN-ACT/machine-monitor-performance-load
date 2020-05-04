import React, {Component} from "react";

import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

class Widget extends Component{
    render() {
        const {
            osType,
            osUpTime,
            freeMem,
            totalMem,
            memUsage,
            cpusModel,
            cpusSpeed,
            coresCount,
            cpusCount,
            cpuUsage,
            macAddress
        } = this.props.data;
        const cpu = {cpuUsage};
        const mem = {totalMem, memUsage, freeMem};
        const info = {macAddress, osType, osUpTime, cpusModel, cpusSpeed, coresCount, cpusCount};
        return (
            <div>
                <Cpu data={cpu}/>
                <Mem data={mem}/>
                <Info data={info}/>
            </div>
        );
    }
}

export default Widget;