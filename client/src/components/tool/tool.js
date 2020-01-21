import React from 'react';
import Controller from '../controller/controller';
import Visualizer from '../visualizer/visualizer';

class Tool extends React.Component {

    constructor() {
        super();
        this.state = {
            binDimensions: {
                binLength: 0,
                binWidth: 0,
                binHeight: 0
            },
            itemDimensions: []
        };
        this.visualizerRef = React.createRef();
    }

    onBinStateUpdate({ target }) {
        this.setState((previousState) => { 
            return {
                binDimensions: {
                    binLength: (target.name !== 'binLength' ? previousState.binDimensions.binLength : (parseFloat(target.value) || '')),
                    binHeight: (target.name !== 'binHeight' ? previousState.binDimensions.binHeight : (parseFloat(target.value) || '')),
                    binWidth: (target.name !== 'binWidth' ? previousState.binDimensions.binWidth : (parseFloat(target.value) || ''))
                },
                itemDimensions: previousState.itemDimensions
            }
        });
    }

    packItems() {
        this.visualizerRef.current.renderItems();
    }

    render() {
        return (
            <div className="row">
                <div id="controller" className="col-md-3 container-spotter-no-padding-div container container-spotter-left-div">
                    <Controller 
                        binDimensions={this.state.binDimensions} 
                        itemDimensions={this.state.itemDimensions} 
                        onBinStateUpdate={this.onBinStateUpdate.bind(this)}
                        packItems={this.packItems.bind(this)}
                    />
                </div>
                <div id="view" className="col-md-9 container-spotter-no-padding-div container-spotter-right-div">
                    <Visualizer 
                        ref={this.visualizerRef}
                        binDimensions={this.state.binDimensions}
                        itemDimensions={this.state.itemDimensions}
                    />
                </div>
            </div>
        );
    }

}

export default Tool;