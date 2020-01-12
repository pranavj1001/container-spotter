import React from 'react';

const Controller = () => {
    return (
        <div className="container-spotter-content-div">
            <h3>Container Spotter</h3>
            <hr className="container-spotter-basic-hr" />
            <h4>Bin Dimensions</h4>
            <hr className="container-spotter-basic-hr" />
            <div className="form-group">
                <div className="row">
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label for="binXCoordinate">Length</label>
                        <input type="number" className="form-control" name="binXCoordinate" id="binXCoordinate" placeholder="20" />
                    </div>
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label for="binZCoordinate">Width</label>
                        <input type="number" className="form-control" name="binZCoordinate" id="binZCoordinate" placeholder="10" />
                    </div>
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label for="binYCoordinate">Height</label>
                        <input type="number" className="form-control" name="binYCoordinate" id="binYCoordinate" placeholder="10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controller;