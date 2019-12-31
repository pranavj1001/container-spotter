import React from 'react';
import Controller from '../controller/controller';
import Visualizer from '../visualizer/visualizer';

const Tool = () => {
    return (
        <div className="row">
            <div id="controller" className="col-md-3 container-spotter-no-padding-div container container-spotter-left-div">
                <Controller />
            </div>
            <div id="view" className="col-md-9 container-spotter-no-padding-div container-spotter-right-div">
                <Visualizer />
            </div>
        </div>
    );
};

export default Tool;