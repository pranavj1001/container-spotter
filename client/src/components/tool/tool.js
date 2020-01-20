import React from 'react';
import Controller from '../controller/controller';
import Visualizer from '../visualizer/visualizer';

class Tool extends React.Component {

    constructor() {
        super();
        this.state = {
            binDimensions: {
                binXCoordinate: 0,
                binZCoordinate: 0,
                binYCoordinate: 0
            },
            itemDimensions: []
        };
    }

    onBinStateUpdate({ target }) {
        this.setState((previousState) => { 
            return {
                binDimensions: {
                    binXCoordinate: (target.name !== 'binXCoordinate' ? previousState.binDimensions.binXCoordinate : (parseFloat(target.value) || '')),
                    binYCoordinate: (target.name !== 'binYCoordinate' ? previousState.binDimensions.binYCoordinate : (parseFloat(target.value) || '')),
                    binZCoordinate: (target.name !== 'binZCoordinate' ? previousState.binDimensions.binZCoordinate : (parseFloat(target.value) || ''))
                },
                itemDimensions: previousState.itemDimensions
            }
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="row">
                <div id="controller" className="col-md-3 container-spotter-no-padding-div container container-spotter-left-div">
                    <Controller 
                        binDimensions={this.state.binDimensions} 
                        itemDimensions={this.state.itemDimensions} 
                        onBinStateUpdate={this.onBinStateUpdate.bind(this)}
                    />
                </div>
                <div id="view" className="col-md-9 container-spotter-no-padding-div container-spotter-right-div">
                    <Visualizer />
                </div>
            </div>
        );
    }

}

export default Tool;