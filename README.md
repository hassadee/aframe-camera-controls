# aframe-camera-controls
A-frame plugins for Camera-controls.

# READ CAREFULLY
This is just a quick'n'dirty (literally nothing more than a copy'n'paste, do not expect nothing classy guys) implementation of [Threejs camera controls Plugin](https://www.npmjs.com/package/camera-controls) as [A-frame](https://aframe.io/) component. The base is the awesome [Superframe](https://github.com/supermedium/superframe) (ex-kframe) [orbit-controls plugin](https://github.com/supermedium/superframe/tree/master/components/orbit-controls)



# Basic Usage

Add the component to the camera element:
```
<a-entity
  id="the-camera"
  cameracontrols="initialPosition: 3.5909066036114665 1.5843741492086918 5.575048598071086; dollySpeed: 1; truckSpeed: 2; minPolarAngle: 20; maxPolarAngle: 105; minDistance: 5; maxDistance: 11; dampingFactor: 0.08; target: #the-element-we-are-looking-at;"
  camera="zoom: 1;"
  position="0 0 0"
  rotation="0 0 0">
</a-entity>
```

... move the camera as you want, then get the current position:

```
let position = document.querySelector('#the-camera').components.cameracontrols.cameraControls.toJSON();
```

Animate the camera to a position:
```
document.querySelector('#the-camera').components.cameracontrols.cameraControls.fromJSON( JSON.stringify( position ), true);
```

Example of a position value:
```
{
  "enabled": true,
  "minDistance": 0,
  "maxDistance": 1.7976931348623e+308,
  "minPolarAngle": 0,
  "maxPolarAngle": 3.1415926535898,
  "minAzimuthAngle": -1.7976931348623e+308,
  "maxAzimuthAngle": 1.7976931348623e+308,
  "dampingFactor": 0.05,
  "draggingDampingFactor": 0.25,
  "dollySpeed": 1,
  "truckSpeed": 2,
  "target": [-0.37917888854706, -0.47959704424181, -0.13915770200862],
  "position": [-4.613750653072203, 4.525158764957159, 2.224967126484331],
  "target0": [0, 0, 0],
  "position0": [0, 2, 0]
}
```
