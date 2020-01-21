import React, { Component } from 'react';
import './visualizer.css';
import * as THREE from 'three/build/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Visualizer extends Component {

    constructor(props) {
        super(props);

        this.binContainerLength = 20;
        this.binContainerHeight = 10;
        this.binContainerWidth = 10;
        this.containerMaterial = [];
        this.containerGeometry = '';
        this.containerEdges = '';
    }

    componentDidMount() {

        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0x808080);
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( this.mount.offsetWidth, this.mount.offsetHeight );
        this.mount.appendChild( renderer.domElement );
        let camera = new THREE.PerspectiveCamera( 75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000 );

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
        let binObject = new THREE.Object3D();
        binObject.add(this.containerCube);
        binObject.add(this.containerLine);

        scene.add(binObject);

        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        // directional light
        let light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        // ambient light
        let ambient = new THREE.AmbientLight( 0xffffff );
        scene.add( ambient );
        
        camera.position.set(0,0,30);
        renderer.render( scene, camera );

        let controls = new OrbitControls( camera, this.mount );
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 20;
        controls.maxDistance = 40;
        controls.maxPolarAngle = Math.PI / 2;

        // let handleClickEvents = (event) => {
        //     var element = event.target || event.srcElement
        //     if (element !== renderer.domElement) {
        //         event.stopPropagation();
        //         event.preventDefault();
        //         if (element.tagName === 'INPUT') {
        //             element.focus();
        //         } else {
        //             document.activeElement.blur();
        //         }
        //     }
        // };

        let onWindowResize = () => {
            camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( this.mount.offsetWidth, this.mount.offsetHeight );
        };

        let onMouseMove = (event) => {
            // calculate this.mouse position in normalized device coordinates
            // (-1 to +1) for both components
            mouse.x = ( ( event.clientX - this.mount.offsetLeft ) / this.mount.clientWidth ) * 2 - 1;
            mouse.y = - ( ( event.clientY - this.mount.offsetTop ) / this.mount.clientHeight ) * 2 + 1;
        };

        let animate = () => {
            requestAnimationFrame( animate );
            controls.update();

            // update the picking ray with the camera and this.mouse position
            raycaster.setFromCamera( mouse, camera );

            // calculate objects intersecting the picking ray
            var intersects = raycaster.intersectObjects( scene.children[0].children.slice(2) );

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

            renderer.render( scene, camera );
        };

        window.addEventListener( 'resize', onWindowResize, false );
        // document.getElementById('controller').addEventListener( 'mousedown', handleClickEvents, false );
        this.mount.addEventListener( 'mousemove', onMouseMove, false );

        animate();
    }

    renderItems() {
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

    render() {
        return (
            <div className="full-height-div" ref={ref => (this.mount = ref)} />
        );
    }
}

export default Visualizer;