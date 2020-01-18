import React from 'react';
import Bin from '../bin/bin';

const Controller = () => {
    return (
        <div className="container-spotter-content-div">
            <h3>Container Spotter</h3>
            <hr className="container-spotter-basic-hr" />
            <Bin />
            <hr className="container-spotter-item-divider-hr" />
			<button className="btn btn-primary">Pack</button>
        </div>
    );
};

export default Controller;