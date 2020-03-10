import React, { Component } from 'react';
import './visualizer.css';
import * as THREE from 'three/build/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Visualizer extends Component {

    constructor(props) {
        super(props);

        // bin dimensions
        this.binContainerLength = 20;
        this.binContainerHeight = 10;
        this.binContainerWidth = 10;

        // bin geometry
        this.containerMaterial = [];
        this.containerGeometry = '';
        this.containerEdges = '';

        // camera 
        this.camera = '';

        // renderer
        this.renderer = '';

        // mouse
        this.mouse = '';

        // controls
        this.controls = '';
        
        // raycaster
        this.raycaster = '';

        // scene
        this.scene = '';

        // items
        this.binObject = '';
        this.cubes = [];
        this.listOfItems = [];
        this.packedItems = [];
        this.notPackedItems = [];
        this.totalItemsVolume = 0;

        // pivots
        this.pivots = [{
            xCoordinate: 0,
            yCoordinate: 0,
            zCoordinate: 0,
            origin: true
        }];
    }

    componentDidMount() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x808080);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.mount.offsetWidth, this.mount.offsetHeight );
        this.mount.appendChild( this.renderer.domElement );
        this.camera = new THREE.PerspectiveCamera( 75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000 );

        this.containerGeometry = new THREE.BoxGeometry( this.binContainerLength, this.binContainerHeight, this.binContainerWidth );
        this.containerMaterial.push(new THREE.MeshLambertMaterial({
            opacity:0.1,
            transparent: true,
            side: THREE.DoubleSide
        }));
        this.containerMaterial.push(new THREE.MeshLambertMaterial({
            opacity:0.1,
            transparent: true,
            side: THREE.DoubleSide
        }));
        this.containerMaterial.push(new THREE.MeshLambertMaterial({
            opacity:0.1,
            transparent: true,
            side: THREE.DoubleSide
        }));
        this.containerMaterial.push(new THREE.MeshLambertMaterial({
            opacity:0.7,
            color:0x111122,
            side: THREE.DoubleSide
        }));
        this.containerMaterial.push(new THREE.MeshLambertMaterial({
            opacity:0.1,
            transparent: true,
            side: THREE.DoubleSide
        }));
        this.containerMaterial.push(new THREE.MeshLambertMaterial({
            opacity:0.1,
            transparent: true,
            side: THREE.DoubleSide
        }));
        this.containerEdges = new THREE.EdgesGeometry( this.containerGeometry );
        this.containerLine = new THREE.LineSegments( this.containerEdges, new THREE.LineBasicMaterial( { color: 0x111111 } ) );
        this.containerCube = new THREE.Mesh( this.containerGeometry, this.containerMaterial );

        //create a Object3D and add the two cubes
        this.binObject = new THREE.Object3D();
        this.binObject.add(this.containerCube);
        this.binObject.add(this.containerLine);

        this.scene.add(this.binObject);

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // directional light
        let light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        this.scene.add( light );

        // ambient light
        let ambient = new THREE.AmbientLight( 0xffffff );
        this.scene.add( ambient );
        
        this.camera.position.set(0,0,30);
        this.renderer.render( this.scene, this.camera );

        this.controls = new OrbitControls( this.camera, this.mount );
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 20;
        this.controls.maxDistance = 40;
        this.controls.maxPolarAngle = Math.PI / 2;

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
        document.getElementById('controller').addEventListener( 'mousedown', this.handleClickEvents.bind(this), false );
        this.mount.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );

        let animate = () => {
            requestAnimationFrame(animate);
            this.controls.update();
    
            // update the picking ray with the this.camera and this.this.mouse position
            this.raycaster.setFromCamera( this.mouse, this.camera );
    
            // calculate objects intersecting the picking ray
            var intersects = this.raycaster.intersectObjects( this.scene.children[0].children.slice(2) );
    
            // for ( var i = 0; i < intersects.length; i++ ) {
            // 	intersects[ i ].object.material.color.set( 0xff0000 );
            // }
    
            if ( intersects.length > 0 ) {
                if ( this.INTERSECTED !== intersects[ 0 ].object ) {
                    if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                    this.INTERSECTED = intersects[ 0 ].object;
                    this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                    this.INTERSECTED.material.emissive.setHex( 0xffffff );
                }
            } else {
                if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                this.INTERSECTED = null;
            }
    
            this.renderer.render( this.scene, this.camera );
        }

        animate();
    }

    renderBin() {
        this.containerGeometry.dispose();
        this.containerEdges.dispose();

        this.binContainerLength = this.props.binDimensions.binLength === '' || this.props.binDimensions.binLength === 0 ? 20 : this.props.binDimensions.binLength;
        this.binContainerHeight = this.props.binDimensions.binHeight === '' || this.props.binDimensions.binHeight === 0 ? 10 : this.props.binDimensions.binHeight;
        this.binContainerWidth = this.props.binDimensions.binWidth === '' || this.props.binDimensions.binWidth === 0 ? 10 : this.props.binDimensions.binWidth;

        var newContainerGeometry = new THREE.BoxGeometry( this.binContainerLength, this.binContainerHeight, this.binContainerWidth );
        var newContainerEdges = new THREE.EdgesGeometry( newContainerGeometry );
        this.containerCube.geometry = newContainerGeometry;
        this.containerLine.geometry = newContainerEdges;
    }

    resetItems() {
        if (this.cubes.length > 0) {
            for (const cube of this.cubes) {
                let counter = 0;
                for (const item of this.binObject.children) {
                    if (cube.uuid === item.uuid) {
                        this.binObject.children.splice(counter, 1);
                        break;
                    }
                    counter++;
                }
            }
    
            this.cubes = [];
            this.listOfItems = [];
            this.packedItems = [];
            this.notPackedItems = [];
            this.totalItemsVolume = 0;
    
            this.pivots = [{
                xCoordinate: 0,
                yCoordinate: 0,
                zCoordinate: 0,
                origin: true
            }];
        }
    }

    prepareListOfItems(data) {
        for (let item of data) {
            item = JSON.parse(JSON.stringify(item));
            item.volume = item.itemLength * item.itemHeight * item.itemWidth;
            this.totalItemsVolume += item.volume * item.itemQuantity;
            for (let i = 0; i < item.itemQuantity; i++) {
                this.listOfItems.push(item);
            }
        }
        this.listOfItems.sort((a, b) => (a.volume > b.volume) ? -1 : ((a.volume < b.volume) ? 1 : 0));
    }

    // ------------------------------------------------------ //
    // Pack Item Helper Functions Start
    checkIfCurrentItemIsInsideAPackedItem(item, pivot) {
        // check cuboid top 2 points only since we are 
        const point = {
            xCoordinate: pivot.xCoordinate,
            yCoordinate: pivot.yCoordinate + item.itemHeight,
            zCoordinate: pivot.zCoordinate,
            z2Coordinate: pivot.zCoordinate + item.itemWidth
        };

        for (const packedItem of this.packedItems) {
            // if the points lie inside the packedItem
            if (
                ((packedItem.itemLength + packedItem.pivotPosition.xCoordinate) > point.xCoordinate && point.xCoordinate > packedItem.pivotPosition.xCoordinate) &&
                ((packedItem.itemHeight + packedItem.pivotPosition.yCoordinate) > point.yCoordinate && point.yCoordinate > packedItem.pivotPosition.yCoordinate) &&
                (
                    ((packedItem.itemWidth + packedItem.pivotPosition.zCoordinate) > point.zCoordinate && point.zCoordinate > packedItem.pivotPosition.zCoordinate) ||
                    ((packedItem.itemWidth + packedItem.pivotPosition.zCoordinate) > point.z2Coordinate && point.z2Coordinate > packedItem.pivotPosition.zCoordinate)
                )
            ) {
                return true;
            }

            // if item about to be packed ends at the same itemLength like packedItem
            if (
                point.xCoordinate === packedItem.pivotPosition.xCoordinate &&
                ((packedItem.itemHeight + packedItem.pivotPosition.yCoordinate) > point.yCoordinate && point.yCoordinate > packedItem.pivotPosition.yCoordinate) &&
                (
                    ((packedItem.itemWidth + packedItem.pivotPosition.zCoordinate) > point.zCoordinate && point.zCoordinate > packedItem.pivotPosition.zCoordinate) ||
                    ((packedItem.itemWidth + packedItem.pivotPosition.zCoordinate) > point.z2Coordinate && point.z2Coordinate > packedItem.pivotPosition.zCoordinate)
                )
            ) {
                return true;
            }

            // if item about to be packed ends at the same itemWidth like packedItem
            if (
                point.yCoordinate === (packedItem.itemHeight + packedItem.pivotPosition.yCoordinate) &&
                ((packedItem.itemLength + packedItem.pivotPosition.xCoordinate) > point.xCoordinate && point.xCoordinate > packedItem.pivotPosition.xCoordinate) &&
                (
                    ((packedItem.itemWidth + packedItem.pivotPosition.zCoordinate) > point.zCoordinate && point.zCoordinate > packedItem.pivotPosition.zCoordinate) ||
                    ((packedItem.itemWidth + packedItem.pivotPosition.zCoordinate) > point.z2Coordinate && point.z2Coordinate > packedItem.pivotPosition.zCoordinate)
                )
            ) {
                return true;
            }

            // if item about to be packed ends at the same itemHeight like packedItem
            if (
                (point.zCoordinate === packedItem.pivotPosition.zCoordinate && point.z2Coordinate  === (packedItem.itemWidth + packedItem.pivotPosition.zCoordinate)) &&
                ((packedItem.itemLength + packedItem.pivotPosition.xCoordinate) > point.xCoordinate && point.xCoordinate > packedItem.pivotPosition.xCoordinate) &&
                ((packedItem.itemHeight + packedItem.pivotPosition.yCoordinate) > point.yCoordinate && point.yCoordinate > packedItem.pivotPosition.yCoordinate)
                
            ) {
                return true;
            }
        }

        return false;
    }

    calculateMaxPossibleDimensions(currentPivot, pivots) {
        // TODO: Improve this function to check for pivots which are not in the same line also
        const maxDimensionsPossible = {
            length: this.binContainerLength,
            breadth: this.binContainerWidth,
            height: this.binContainerHeight
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
                    else if 
                        (pivot.yCoordinate === currentPivot.yCoordinate &&
                        pivot.zCoordinate > currentPivot.zCoordinate &&
                        pivot.xCoordinate > currentPivot.xCoordinate) {
                            maxDimensionsPossible.breadth = pivot.yCoordinate - currentPivot.yCoordinate;
                    } 
                    else if 
                        (pivot.zCoordinate === currentPivot.zCoordinate &&
                        pivot.yCoordinate > currentPivot.yCoordinate &&
                        pivot.xCoordinate > currentPivot.xCoordinate) {
                            maxDimensionsPossible.length = pivot.xCoordinate - currentPivot.xCoordinate;
                    }

                }
        }

        return maxDimensionsPossible;
    }

    removePivotsInSameLine(pivots) {
        for (let i = 0; i < pivots.length - 1; i++) {
            for (let j = i + 1; j < pivots.length; j++) {
                const pivotA = pivots[i];
                const pivotB = pivots[j];
    
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
    }

    isPointInsideACuboid(point) {
        if ((point.xCoordinate === 0.01 || point.zCoordinate === 0.01) && (point.yCoordinate === -0.01)) {
            return true;
        }
    
        for (const packedItem of this.packedItems) {
            if (
                ((packedItem.itemLength + packedItem.pivotPosition.xCoordinate) > point.xCoordinate && point.xCoordinate > packedItem.pivotPosition.xCoordinate) &&
                ((packedItem.itemHeight + packedItem.pivotPosition.yCoordinate) > point.yCoordinate && point.yCoordinate > packedItem.pivotPosition.yCoordinate) &&
                ((packedItem.itemWidth + packedItem.pivotPosition.zCoordinate) > point.zCoordinate && point.zCoordinate > packedItem.pivotPosition.zCoordinate)
            ) {
                return true;
            }
        }
    
        return false;
    }

    doesItemFit(pivot, item, pivots) {
        // TODO P3: perform item rotations
        const maxDimensionsPossible = this.calculateMaxPossibleDimensions(pivot, pivots);
        const maxLength = maxDimensionsPossible.length;
        const maxBreadth = maxDimensionsPossible.breadth;
        const maxHeight = maxDimensionsPossible.height;
        if (!this.checkIfCurrentItemIsInsideAPackedItem(item, pivot)) {
            if (item.itemLength + pivot.xCoordinate > maxLength ||
                item.itemHeight + pivot.yCoordinate > maxBreadth ||
                item.itemWidth + pivot.zCoordinate > maxHeight
                ) {
                    return false;
                } else {
                    return true;   
                }
        } else {
            return false;
        }
    }
    // Pack Item Helper Functions End
    // ------------------------------------------------------ //

    packItems() {
        for (let item of this.listOfItems) {
            item = JSON.parse(JSON.stringify(item));
            let itemNotPacked = true;
            let counter = 0;
            for (const pivot of this.pivots) {
                if (this.doesItemFit(pivot, item, this.pivots)) {
                    item.pivotPosition = pivot;
                    this.packedItems.push(item);
                    itemNotPacked = false;
                    let newPivot = {};
    
                    // TODO: fine tune pivot adding logic more
                    newPivot = {
                        xCoordinate: pivot.xCoordinate + 0.01,
                        yCoordinate: pivot.yCoordinate - 0.01,
                        zCoordinate: pivot.zCoordinate + item.itemWidth + 0.01
                    };
                    if (this.isPointInsideACuboid(newPivot)) {
                        this.pivots.push({
                            xCoordinate: pivot.xCoordinate,
                            yCoordinate: pivot.yCoordinate,
                            zCoordinate: pivot.zCoordinate + item.itemWidth,
                            origin: false
                        });
                    }
    
                    newPivot = {
                        xCoordinate: pivot.xCoordinate + 0.01,
                        yCoordinate: pivot.yCoordinate + item.itemHeight + 0.01,
                        zCoordinate: pivot.zCoordinate + 0.01
                    }
                    if (!this.isPointInsideACuboid(newPivot)) {
                        this.pivots.push({
                            xCoordinate: pivot.xCoordinate,
                            yCoordinate: pivot.yCoordinate + item.itemHeight,
                            zCoordinate: pivot.zCoordinate,
                            origin: false
                        });
                    }
    
                    newPivot = {
                        xCoordinate: pivot.xCoordinate + item.itemLength + 0.01,
                        yCoordinate: pivot.yCoordinate - 0.01,
                        zCoordinate: pivot.zCoordinate + 0.01
                    };
                    if (this.isPointInsideACuboid(newPivot)) {
                        this.pivots.push({
                            xCoordinate: pivot.xCoordinate + item.itemLength,
                            yCoordinate: pivot.yCoordinate,
                            zCoordinate: pivot.zCoordinate,
                            origin: false
                        });
                    }
    
                    this.pivots.splice(counter, 1);
                    this.removePivotsInSameLine(this.pivots);
                    break;
                }
                counter++;
            }
        
            if (itemNotPacked) {
                this.notPackedItems.push(item);
            }
        }
    }

    addAndRenderItems() {
        // render boxes as per spotting logic
        for (const item of this.packedItems) {
            const itemGeometry = new THREE.BoxGeometry( item.itemLength, item.itemHeight, item.itemWidth);
            itemGeometry.translate(
                (item.itemLength - this.binContainerLength) / 2,
                (item.itemHeight - this.binContainerHeight) / 2,
                (item.itemWidth - this.binContainerWidth) / 2
            );
            const itemMaterial = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
            const itemCube = new THREE.Mesh( itemGeometry, itemMaterial );
            const itemPivot = item.pivotPosition;
            itemCube.position.set(itemPivot.xCoordinate, itemPivot.yCoordinate, itemPivot.zCoordinate);
            this.binObject.add(itemCube);
            this.cubes.push(itemCube);
        }
    }

    onWindowResize() {
        this.camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.mount.offsetWidth, this.mount.offsetHeight );
    }

    handleClickEvents(event) {
        var element = event.target || event.srcElement;
        if (element !== this.renderer.domElement) {
            event.stopPropagation();
            event.preventDefault();
            if (element.tagName === 'INPUT') {
                element.focus();
            } else {
                document.activeElement.blur();
            }
        }
    };

    onMouseMove(event) {
        // calculate this.mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouse.x = ( ( event.clientX - this.mount.offsetLeft ) / this.mount.clientWidth ) * 2 - 1;
        this.mouse.y = - ( ( event.clientY - this.mount.offsetTop ) / this.mount.clientHeight ) * 2 + 1;
    }

    validateAllInputs() {
        // TODO: add function to validate all inputs
        return true;
    }

    renderItems() {

        if (this.validateAllInputs()) {
            this.renderBin();
            this.resetItems();
            this.prepareListOfItems(this.props.itemDimensions);
            this.packItems();
            this.addAndRenderItems();
        } else {
            // TODO: handle invalid inputs here
        }

    }

    render() {
        return (
            <div className="full-height-div" ref={ref => (this.mount = ref)} />
        );
    }
}

export default Visualizer;