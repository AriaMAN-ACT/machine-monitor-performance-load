import React, {Component} from "react";
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";

import RadialSeparators from "./RadialSeparators";
import 'react-circular-progressbar/dist/styles.css';
import '../style/Components/Mem.css';

class Mem extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="mem-container">
                    <CircularProgressbarWithChildren
                        value={this.props.data.memUsage}
                        text={`${this.props.data.memUsage}%`}
                        strokeWidth={4}
                        styles={buildStyles({
                            strokeLinecap: "butt",
                            textColor: '#00a8ff',
                            pathColor: '#00a8ff',
                            trailColor: '#353b48'
                        })}
                    >
                        <RadialSeparators
                            count={24}
                            style={{
                                background: "#f5f6fa",
                                width: "2px",
                                height: `${4}%`
                            }}
                        />
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        );
    }
}

export default Mem;