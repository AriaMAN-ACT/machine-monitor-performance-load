import React, {Component} from "react";

import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import '../style/Components/Widget.css';

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
            <div className="widget-container">
                <Cpu data={cpu} className="widget-child"/>
                <Mem data={mem} className="widget-child"/>
                <Info data={info} className="widget-child"/>
            </div>
        );
    }
}

export default Widget;