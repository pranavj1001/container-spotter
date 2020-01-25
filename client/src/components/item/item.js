import React from 'react';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            itemDetails: props.itemDetails
        };
    }

    handleChange = ({ target }) => {
        this.setState((previousState) => { 
            return {
                index: previousState.index,
                itemDetails: {
                    itemLength: target.name !== 'itemLength' ? previousState.itemDetails.itemLength : parseFloat(target.value) || '',
                    itemWidth: target.name !== 'itemWidth' ? previousState.itemDetails.itemWidth : parseFloat(target.value) || '',
                    itemHeight: target.name !== 'itemHeight' ? previousState.itemDetails.itemHeight : parseFloat(target.value) || '',
                    itemColor: target.name !== 'itemColor' ? previousState.itemDetails.itemColor : target.value,
                    itemQuantity: target.name !== 'itemQuantity' ? previousState.itemDetails.itemQuantity : parseFloat(target.value) || '',
                    itemId: previousState.itemDetails.itemId
                }
            }
        });
        this.props.updateItemDetails(this.state);
    }

    render() {
        return(
            <React.Fragment>
                <h5>Item {this.state.index + 1}</h5>
                <div className="row">
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label htmlFor="item4XCoordinate">Length</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name='itemLength'
                            placeholder="4" 
                            value={this.state.itemDetails.itemLength}
                            onChange={this.handleChange}
                            onKeyUp={this.handleChange}
                        />
                    </div>
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label htmlFor="itemWidth">Width</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="itemWidth"
                            placeholder="5" 
                            value={this.state.itemDetails.itemWidth}
                            onChange={this.handleChange}
                            onKeyUp={this.handleChange}
                        />
                    </div>
                    <div className="col-lg-4 container-spotter-input-label-block">
                        <label htmlFor="itemHeight">Height</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="itemHeight"
                            placeholder="6" 
                            value={this.state.itemDetails.itemHeight}
                            onChange={this.handleChange}
                            onKeyUp={this.handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 container-spotter-input-label-block">
                        <label htmlFor="itemQuantity">Quantity</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="itemQuantity"
                            placeholder="1" 
                            value={this.state.itemDetails.itemQuantity}
                            onChange={this.handleChange}
                            onKeyUp={this.handleChange}
                        />
                    </div>
                    <div className="col-lg-6 container-spotter-input-label-block">
                        <label htmlFor="itemColor">Box Color</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="itemColor"
                            placeholder="0xffff00" 
                            value={this.state.itemDetails.itemColor}
                            onChange={this.handleChange}
                            onKeyUp={this.handleChange}
                        />
                    </div>
                </div>
                <hr className="container-spotter-item-divider-hr"></hr>
            </React.Fragment>
        );
    }

}

export default Item;