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

        // let handleClickEvents = (event) => {
        //     var element = event.target || event.srcElement
        //     if (element !== this.renderer.domElement) {
        //         event.stopPropagation();
        //         event.preventDefault();
        //         if (element.tagName === 'INPUT') {
        //             element.focus();
        //         } else {
        //             document.activeElement.blur();
        //         }
        //     }
        // };

        window.addEventListener( 'resize', this.onWindowResize(), false );
        // document.getElementById('controller').addEventListener( 'mousedown', handleClickEvents, false );
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
            item.volume = item.itemLength * item.itemWidth * item.itemHeight;
            this.totalItemsVolume += item.volume * item.itemQuantity;
            for (let i = 0; i < item.itemQuantity; i++) {
                this.listOfItems.push(item);
            }
        }
        this.listOfItems.sort((a, b) => (a.volume > b.volume) ? -1 : ((a.volume < b.volume) ? 1 : 0));
    }

    packItems() {
        console.log(this.listOfItems);
    }

    addAndRenderItems() {

    }

    onWindowResize() {
        this.camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.mount.offsetWidth, this.mount.offsetHeight );
    }

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
        console.log(this.props.itemDimensions);

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