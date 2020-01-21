import React from 'react';
import Bin from '../bin/bin';

class Controller extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    onBinPropsUpdate({ target }) {
        this.props.onBinStateUpdate({ target });
    }

    packItems() {
        this.props.packItems();
    }

    render() {
        return (
            <div className="container-spotter-content-div">
                <h3>Container Spotter</h3>
                <hr className="container-spotter-basic-hr" />
                <Bin 
                    dimensions={this.props.binDimensions} 
                    onBinPropsUpdate={this.onBinPropsUpdate.bind(this)}
                />
                <hr className="container-spotter-item-divider-hr" />
                <button className="btn btn-primary" onClick={this.packItems.bind(this)}>Pack</button>
            </div>
        );
    }
}

export default Controller;