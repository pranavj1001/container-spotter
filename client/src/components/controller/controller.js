import React from 'react';
import Bin from '../bin/bin';

class Controller extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            itemDimensions : props.itemDimensions
        };
    }

    onBinPropsUpdate({ target }) {
        this.props.onBinStateUpdate({ target });
    }

    packItems() {
        this.props.packItems();
    }

    addItemBlock() {
        console.log('Add Item Block WIP');
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
                <h4 className="display-inline-block">Item Details</h4>
                <button className="btn btn-primary container-spotter-add-item-button" 
                    onClick={this.addItemBlock} title="Add item">&#43;</button>
                <hr className="container-spotter-basic-hr" />
                <button className="btn btn-primary" onClick={this.packItems.bind(this)}>Pack</button>
            </div>
        );
    }
}

export default Controller;