import React from 'react';

class Bin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            binLength: props.dimensions.binLength,
            binHeight: props.dimensions.binHeight,
            binWidth: props.dimensions.binWidth
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
                            <label htmlFor="binLength">Length</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="binLength"
                                placeholder="20" 
                                value={this.state.binLength}
                                onChange={this.handleChange}
                                onKeyUp={this.handleChange}
                            />
                        </div>
                        <div className="col-lg-4 container-spotter-input-label-block">
                            <label htmlFor="binWidth">Width</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="binWidth"
                                placeholder="10" 
                                value={this.state.binWidth}
                                onChange={this.handleChange}
                                onKeyUp={this.handleChange}
                            />
                        </div>
                        <div className="col-lg-4 container-spotter-input-label-block">
                            <label htmlFor="binHeight">Height</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="binHeight"
                                placeholder="10" 
                                value={this.state.binHeight}
                                onChange={this.handleChange}
                                onKeyUp={this.handleChange}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Bin;