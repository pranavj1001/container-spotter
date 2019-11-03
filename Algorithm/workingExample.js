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
for (const item of data) {
    item.volume = item.length * item.breadth * item.height;
    totalItemsVolume += item.volume * item.quantity;
    for (let i = 0; i < item.quantity; i++) {
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
}]