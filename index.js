import CameraControls from './lib/CameraControls';


var bind = AFRAME.utils.bind;

AFRAME.registerComponent( 'cameracontrols', {
  dependencies: ['camera'],

  schema: {
    maxDistance: {default: 1000},
    minDistance: {default: 1},
    maxZoom: { default: Infinity },
    maxPolarAngle: {default: Math.PI },
    minPolarAngle: {default: 0},
    minAzimuthAngle: {type: 'number', default: - Infinity},
    maxAzimuthAngle: {type: 'number', default: Infinity},
    dampingFactor: {default: 0.05},
    draggingDampingFactor: {default: 0.25},
    dollySpeed: {default: 1},
    truckSpeed: {default: 2},

    target: {type: 'selector'},
    initialPosition: {type: 'vec3', default: {x: 0, y: 0, z: 0'}}
  },

  init: function () {
    this.cameraControls = false;
    this.bindMethods();
    this.el.addEventListener( 'loaded' , this.installCameraControls );
  },


  installCameraControls: function () {
    if ( false !== this.cameraControls ) {
      return;
    }

    this.bindMethods();
    var el = this.el;
    CameraControls.install( { THREE: THREE } );

    var position, positionArray;
    if ( this.data.target ) {
      position = this.data.target.getAttribute( 'position' );
    }

    if ( !position ) {
      position = { x: 0, y: 2, z: 0 };
    }

    el.setAttribute( 'position', position );
    el.getObject3D('camera').position.set( position.x, position.y, position.z );

    this.cameraControls = new CameraControls( el.getObject3D('camera'), el.sceneEl.renderer.domElement );



    let tmpJSON = Object.assign( {}, this.data );

    tmpJSON.target = [0, 0, 0];
    tmpJSON.target0 = [0, 0, 0];
    tmpJSON.enabled = true;
    tmpJSON.maxPolarAngle = tmpJSON.maxPolarAngle * THREE.Math.DEG2RAD;
    tmpJSON.minPolarAngle = tmpJSON.minPolarAngle * THREE.Math.DEG2RAD;
    tmpJSON.position = [tmpJSON.initialPosition.x, tmpJSON.initialPosition.y, tmpJSON.initialPosition.z];
    tmpJSON.position0 = [position.x, position.y, position.z];
    delete tmpJSON.initialPosition;
    //this.cameraControls.fromObj( tmpJSON, true );


    /**/
    this.clock = new THREE.Clock();
    //this.cameraControls.rotate( -45 * THREE.Math.DEG2RAD, -0.3490658503988659, true );
  },


  onEnterVR: function() {
    var el = this.el;

    if (!AFRAME.utils.device.checkHeadsetConnected() &&
        !AFRAME.utils.device.isMobile()) { return; }
    this.controls.enabled = false;
    if (el.hasAttribute('look-controls')) {
      el.setAttribute('look-controls', 'enabled', true);
      oldPosition.copy(el.getObject3D('camera').position);
      el.getObject3D('camera').position.set(0, 0, 0);
    }
  },

  onExitVR: function() {
    var el = this.el;

    if (!AFRAME.utils.device.checkHeadsetConnected() &&
        !AFRAME.utils.device.isMobile()) { return; }
    this.controls.enabled = true;
    el.getObject3D('camera').position.copy(oldPosition);
    if (el.hasAttribute('look-controls')) {
      el.setAttribute('look-controls', 'enabled', false);
    }
  },


  bindMethods: function() {
    this.onEnterVR = bind(this.onEnterVR, this);
    this.onExitVR = bind(this.onExitVR, this);
    this.installCameraControls = bind(this.installCameraControls, this);
  },

  update: function ( oldData ) {
    if ( this.cameraControls ) {
      //this.cameraControls.update( this.clock.getDelta() );
    }
  },

  tick: function () {
    if ( this.cameraControls ) {
      this.cameraControls.update( this.clock.getDelta() );
    }
  },

  remove: function() {
    //this.controls.reset();
    //this.controls.dispose();

    //this.el.sceneEl.removeEventListener('enter-vr', this.onEnterVR);
    //this.el.sceneEl.removeEventListener('exit-vr', this.onExitVR);
  }
});
