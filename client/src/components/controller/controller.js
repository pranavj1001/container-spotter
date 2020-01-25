import React from 'react';
import Bin from '../bin/bin';
import Item from '../item/item';

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
        this.setState((previousState) => {
            return {
                itemDimensions: previousState.itemDimensions.concat({
                    itemLength: 0,
                    itemWidth: 0,
                    itemHeight: 0,
                    itemColor: '',
                    itemQuantity: 0,
                    itemId: 'item' + (previousState.itemDimensions.length + 1)
                })
            }
        });
    }

    updateItemDetails(itemState) {
        const itemDimensions = this.state.itemDimensions;
        itemDimensions[itemState.index] = itemState.itemDetails;
        this.setState({itemDimensions});
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
                    onClick={this.addItemBlock.bind(this)} title="Add item">&#43;</button>
                <hr className="container-spotter-basic-hr" />
                {
                    this.state.itemDimensions.map((itemDetails, index) => (
                        <Item itemDetails={itemDetails} key={itemDetails.itemId} index={index} updateItemDetails={this.updateItemDetails.bind(this)}/>
                    ))
                }
                <button className="btn btn-primary" onClick={this.packItems.bind(this)}>Pack</button>
            </div>
        );
    }
}

export default Controller;