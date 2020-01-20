import React from 'react';

class Bin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            binXCoordinate: props.dimensions.binXCoordinate,
            binYCoordinate: props.dimensions.binYCoordinate,
            binZCoordinate: props.dimensions.binZCoordinate
        };
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: parseFloat(target.value) || '' });
        this.props.onBinPropsUpdate({ target });
    }

    render() {
        return (
            <React.Fragment>
                <h4>Bin Dimensions</h4>
                <hr className="container-spotter-basic-hr" />
                <div className="form-group">
                    <div className="row">
                        <div className="col-lg-4 container-spotter-input-label-block">
                            <label htmlFor="binXCoordinate">Length</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="binXCoordinate" 
                                id="binXCoordinate" 
                                placeholder="20" 
                                value={this.state.binXCoordinate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-lg-4 container-spotter-input-label-block">
                            <label htmlFor="binZCoordinate">Width</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="binZCoordinate" 
                                id="binZCoordinate" 
                                placeholder="10" 
                                value={this.state.binZCoordinate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-lg-4 container-spotter-input-label-block">
                            <label htmlFor="binYCoordinate">Height</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="binYCoordinate" 
                                id="binYCoordinate" 
                                placeholder="10" 
                                value={this.state.binYCoordinate}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Bin;