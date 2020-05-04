import React, {Component} from "react";

import '../style/Components/Info.css';

class Info extends Component{
    renderText() {
        return Object.values(this.props.data).map((val, index) => <div>{`${Object.keys(this.props.data)[index]}: ${val}`}</div>);
    }

    render() {
        return (
            <div className={`${this.props.className} info-container`}>
                {this.renderText()}
            </div>
        );
    }
}

export default Info;