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
    quantity: 2,
    color: 0x000fff
},{
    name: 'box2',
    length: 3,
    breadth: 3,
    height: 2,
    quantity: 1,
    color: 0xfff000
},{
    name: 'box3',
    length: 4,
    breadth: 2,
    height: 2,
    quantity: 3,
    color: 0xff00ff
},{
    name: 'box4',
    length: 4,
    breadth: 3,
    height: 5,
    quantity: 1,
    color: 0xffff00
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
// console.log(listOfItems);

// pivot
const pivots = [{
    xCoordinate: 0,
    yCoordinate: 0,
    zCoordinate: 0,
    origin: true
}];
maxPivotXCoordinate = 0;
maxPivotYCoordinate = 0;
maxPivotZCoordinate = 0;

const PivotType = {
    FRONT_LEFT_LOWER_CORNER: 1,
    BACK_TOP_UPPER_CORNER: 2,
    FRONT_RIGHT_LOWER_CORNER: 3
}

// list of packed and not packed items
packedItems = [];
notPackedItems = [];

// function which decides whether an item fits 
// in the bin w.r.t. the pivot
const doesItemFit = (pivot, item, pivots) => {
    // TODO P3: perform item rotations
    const maxDimensionsPossible = calculateMaxPossibleDimensions(pivot, pivots);
    maxLength = maxDimensionsPossible.length;
    maxBreadth = maxDimensionsPossible.breadth;
    maxHeight = maxDimensionsPossible.height;
    if (item.length + pivot.xCoordinate > maxLength ||
        item.breadth + pivot.yCoordinate > maxBreadth ||
        item.height + pivot.zCoordinate > maxHeight) {
            return false;
        } else {
            return true;   
        }
};

const calculateMaxPossibleDimensions = (currentPivot, pivots) => {
    // TODO: Improve this function to check for pivots which are not in the same line also
    const maxDimensionsPossible = {
        length: bin.length,
        breadth: bin.breadth,
        height: bin.height
    };
    for (const pivot of pivots) {
        if (!(pivot.xCoordinate === currentPivot.xCoordinate &&
            pivot.yCoordinate === currentPivot.yCoordinate &&
            pivot.zCoordinate === currentPivot.zCoordinate)) {

                if (pivot.xCoordinate === currentPivot.xCoordinate &&
                    pivot.yCoordinate > currentPivot.yCoordinate &&
                    pivot.zCoordinate > currentPivot.zCoordinate) {
                        maxDimensionsPossible.height = pivot.zCoordinate - currentPivot.zCoordinate;
                } 
                // else if 
                //     (pivot.yCoordinate === currentPivot.yCoordinate &&
                //     pivot.zCoordinate > currentPivot.zCoordinate &&
                //     pivot.xCoordinate > currentPivot.xCoordinate) {
                //         maxDimensionsPossible.breadth = pivot.yCoordinate - currentPivot.yCoordinate;
                // } 
                else if 
                    (pivot.zCoordinate === currentPivot.zCoordinate &&
                    pivot.yCoordinate > currentPivot.yCoordinate &&
                    pivot.xCoordinate > currentPivot.xCoordinate) {
                        maxDimensionsPossible.length = pivot.xCoordinate - currentPivot.xCoordinate;
                }

            }
    }

    return maxDimensionsPossible;
};

const removePivotsInSameLine = (pivots) => {
    for (let i = 0; i < pivots.length - 1; i++) {
        for (let j = i + 1; j < pivots.length; j++) {
            pivotA = pivots[i];
            pivotB = pivots[j];

            if (pivotA.xCoordinate === pivotB.xCoordinate && 
                pivotA.yCoordinate === pivotB.yCoordinate) {
                   if (pivotA.zCoordinate > pivotB.zCoordinate) {
                       pivots.splice(i, 1);
                   } else {
                       pivots.splice(j, 1);
                   }
            } else if (
                pivotA.xCoordinate === pivotB.xCoordinate && 
                pivotA.zCoordinate === pivotB.zCoordinate) {
                    if (pivotA.yCoordinate > pivotB.yCoordinate) {
                        pivots.splice(i, 1);
                    } else {
                        pivots.splice(j, 1);
                    }
            } else if(
                pivotA.zCoordinate === pivotB.zCoordinate && 
                pivotA.yCoordinate === pivotB.yCoordinate) {
                    if (pivotA.xCoordinate > pivotB.xCoordinate) {
                        pivots.splice(i, 1);
                    } else {
                        pivots.splice(j, 1);
                    }
            } 
        }
    }
};

for (let item of listOfItems) {
    item = JSON.parse(JSON.stringify(item));
    itemNotPacked = true;
    counter = 0;
    for (const pivot of pivots) {
        if (doesItemFit(pivot, item, pivots)) {
            item.pivotPosition = pivot;
            packedItems.push(item);
            itemNotPacked = false;
            maxPivotXCoordinate = 0;
            maxPivotYCoordinate = 0;
            maxPivotZCoordinate = 0;
            pivots.push({
                xCoordinate: pivot.xCoordinate,
                yCoordinate: pivot.yCoordinate,
                zCoordinate: pivot.zCoordinate + item.height,
                origin: false
            });
            pivots.push({
                xCoordinate: pivot.xCoordinate,
                yCoordinate: pivot.yCoordinate + item.breadth,
                zCoordinate: pivot.zCoordinate,
                origin: false
            });
            pivots.push({
                xCoordinate: pivot.xCoordinate + item.length,
                yCoordinate: pivot.yCoordinate,
                zCoordinate: pivot.zCoordinate,
                origin: false
            });
            pivots.splice(counter, 1);
            removePivotsInSameLine(pivots);
            break;
        }
        counter++;
    }

    if (itemNotPacked) {
        notPackedItems.push(item);
    }
}

// console.log(packedItems, notPackedItems);