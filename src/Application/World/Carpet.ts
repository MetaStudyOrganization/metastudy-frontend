import * as THREE from 'three';
import Application from '../Application';

export default class Carpet {
    application: Application;
    scene: THREE.Scene;
    mesh: THREE.Mesh;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;

        // create a carpet as a flat plane
        const geometry = new THREE.PlaneGeometry(9000, 8000); // 넓은 직사각형
        const material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
        });

        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.rotation.x = -Math.PI / 2; // 수평으로 눕힘
        this.mesh.position.y = 0.01; // 바닥보다 살짝 위에 띄움

        this.scene.add(this.mesh);
    }
}
