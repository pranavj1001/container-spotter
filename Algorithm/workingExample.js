/* Box Fit Working Example
 * 
 * Author: Pranav Jain (pranavj1001@gmail.com)
 * Version: 1
 * Date: 3 Nov, 2019
 * Description: This is a working example which follows the algorithm
 * mentioned here and attempts to solve the same problem.
*/

// Metric system is used here
// sample bin data
const bin = {
    length: 10,
    breadth: 10,
    height: 10
};
bin.volume = bin.length * bin.breadth * bin.height;

// sample items data
const data = [{
    name: 'box1',
    length: 2,
    breadth: 3,
    height: 1,
    quantity: 2
},{
    name: 'box2',
    length: 3,
    breadth: 3,
    height: 2,
    quantity: 1
},{
    name: 'box3',
    length: 4,
    breadth: 2,
    height: 2,
    quantity: 3
},{
    name: 'box4',
    length: 4,
    breadth: 3,
    height: 5,
    quantity: 1
}];

// prepare sorted (desc) listOfItems from data
const listOfItems = [];
let totalItemsVolume = 0;
for (let item of data) {
    item = JSON.parse(JSON.stringify(item));
    item.volume = item.length * item.breadth * item.height;
    totalItemsVolume += item.volume * item.quantity;
    for (let i = 0; i < item.quantity; i++) {
        item.id = item.name + i.toString();

        listOfItems.push(item);
    }
}
listOfItems.sort((a, b) => (a.volume > b.volume) ? -1 : ((a.volume < b.volume) ? 1 : 0));
console.log(listOfItems);

// pivot
const pivots = [{
    xCoordinate: 0,
    yCoordinate: 0,
    zCoordinate: 0
}];
maxPivotXCoordinate = 0;
maxPivotYCoordinate = 0;
maxPivotZCoordinate = 0;

// list of packed and not packed items
packedItems = [];
notPackedItems = [];

// function which decides whether an item fits 
// in the bin w.r.t. the pivot
const doesItemFit = (pivot, item) => {
    // TODO P3: perform item rotations
    // TODO P2: add three condition to check for max possible length available
    if (item.length + pivot.xCoordinate > bin.length ||
        item.breadth + pivot.yCoordinate > bin.breadth ||
        item.height + pivot.zCoordinate > bin.height) {
            return false;
        } else {
            return true;   
        }
};

const checkIfPivotCanBeAdded = (pivotType, item, currentPivot) => {
    switch(pivotType) {
        case PivotType.FRONT_LEFT_LOWER_CORNER:
            for (const pivot of pivots) {
                if (pivot.xCoordinate === currentPivot.xCoordinate && 
                    pivot.yCoordinate === currentPivot.yCoordinate) {
                        return false;
                }
            }
            break;
        case PivotType.BACK_TOP_UPPER_CORNER:
            for (const pivot of pivots) {
                if (pivot.xCoordinate === currentPivot.xCoordinate && 
                    pivot.zCoordinate === currentPivot.zCoordinate) {
                        return false;
                }
            }
            break;
        case PivotType.FRONT_RIGHT_LOWER_CORNER:
            for (const pivot of pivots) {
                if (pivot.zCoordinate === currentPivot.zCoordinate && 
                    pivot.yCoordinate === currentPivot.yCoordinate) {
                        return false;
                }
            }
            break;
    }
    return true;
};

for (let item of listOfItems) {
    item = JSON.parse(JSON.stringify(item));
    itemNotPacked = true;
    counter = 0;
    for (const pivot of pivots) {
        debugger;
        if (doesItemFit(pivot, item)) {
            item.pivotPosition = pivot;
            packedItems.push(item);
            itemNotPacked = false;
            maxPivotXCoordinate = 0;
            maxPivotYCoordinate = 0;
            maxPivotZCoordinate = 0;
            if (checkIfPivotCanBeAdded(PivotType.FRONT_LEFT_LOWER_CORNER, item, currentPivot)) {
                pivots.push({
                    xCoordinate: pivot.xCoordinate,
                    yCoordinate: pivot.yCoordinate,
                    zCoordinate: pivot.zCoordinate + item.height
                });
            }
            if (checkIfPivotCanBeAdded(PivotType.BACK_TOP_UPPER_CORNER, item, currentPivot)) {
                pivots.push({
                    xCoordinate: pivot.xCoordinate,
                    yCoordinate: pivot.yCoordinate + item.breadth,
                    zCoordinate: pivot.zCoordinate
                });
            }
            if (checkIfPivotCanBeAdded(PivotType.FRONT_RIGHT_LOWER_CORNER, item, currentPivot)) {
                pivots.push({
                    xCoordinate: pivot.xCoordinate + item.length,
                    yCoordinate: pivot.yCoordinate,
                    zCoordinate: pivot.zCoordinate
                });
            }
            pivots.splice(counter, 1);
            break;
        }
        counter++;
    }

    if (itemNotPacked) {
        notPackedItems.push(item);
    }
}

const PivotType = {
    FRONT_LEFT_LOWER_CORNER: 1,
    BACK_TOP_UPPER_CORNER: 2,
    FRONT_RIGHT_LOWER_CORNER: 3
}

console.log(packedItems, notPackedItems);