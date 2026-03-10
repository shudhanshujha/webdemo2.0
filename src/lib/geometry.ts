import * as THREE from 'three';

export function createTShirtGeometry() {
  const shape = new THREE.Shape();
  
  // Start at bottom center
  shape.moveTo(0, -3);
  // Bottom right
  shape.lineTo(1.8, -3);
  // Right side
  shape.quadraticCurveTo(1.9, -1, 1.8, 1);
  // Right armpit
  shape.quadraticCurveTo(1.8, 1.2, 2.0, 1.1);
  // Right sleeve bottom
  shape.lineTo(3.2, 0.5);
  // Right sleeve end
  shape.lineTo(3.8, 1.5);
  // Right shoulder
  shape.lineTo(2.2, 2.8);
  // Right neck
  shape.quadraticCurveTo(1.5, 3.2, 1.0, 3.0);
  // Neck dip
  shape.quadraticCurveTo(0, 2.2, -1.0, 3.0);
  // Left neck
  shape.quadraticCurveTo(-1.5, 3.2, -2.2, 2.8);
  // Left shoulder
  shape.lineTo(-3.8, 1.5);
  // Left sleeve end
  shape.lineTo(-3.2, 0.5);
  // Left sleeve bottom
  shape.lineTo(-2.0, 1.1);
  // Left armpit
  shape.quadraticCurveTo(-1.8, 1.2, -1.8, 1);
  // Left side
  shape.quadraticCurveTo(-1.9, -1, -1.8, -3);
  // Back to start
  shape.lineTo(0, -3);

  const extrudeSettings = {
    depth: 0.6,
    bevelEnabled: true,
    bevelSegments: 12,
    steps: 2,
    bevelSize: 0.3,
    bevelThickness: 0.3,
    curveSegments: 32,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}
