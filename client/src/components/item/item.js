import React from 'react';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            itemDetails: props.itemDetails
        };
    }

    render() {
        return(
            <React.Fragment>
                <h5>Item 4</h5>
                <div className="row">
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label htmlFor="item4XCoordinate">Length</label>
                        <input type="number" className="form-control" name="item4XCoordinate" id="item4XCoordinate" placeholder="4" />
                    </div>
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label htmlFor="item4YCoordinate">Width</label>
                        <input type="number" className="form-control" name="item4YCoordinate" id="item4YCoordinate" placeholder="5" />
                    </div>
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label htmlFor="item4ZCoordinate">Height</label>
                        <input type="number" className="form-control" name="item4ZCoordinate" id="item4ZCoordinate" placeholder="3" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 container-spotter-input-label-block">
                        <label htmlFor="item4Quantity">Quantity</label>
                        <input type="number" className="form-control" name="item4Quantity" id="item4Quantity" placeholder="1" />
                    </div>
                    <div className="col-lg-6 container-spotter-input-label-block">
                        <label htmlFor="item4Color">Box Color</label>
                        <input type="text" className="form-control" name="item4Color" id="item4Color" placeholder="0xffff00" />
                    </div>
                </div>
                <hr className="container-spotter-item-divider-hr"></hr>
            </React.Fragment>
        );
    }

}

export default Item;