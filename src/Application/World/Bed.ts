import * as THREE from 'three';
import Application from '../Application';

export default class Bed {
    application: Application;
    scene: THREE.Scene;
    frame: THREE.Mesh;
    mattress: THREE.Mesh;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;

        // 침대 프레임 (밑판)
        const frameGeometry = new THREE.BoxGeometry(6000, 300, 3000);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513, // 나무색
            roughness: 1,
        });
        this.frame = new THREE.Mesh(frameGeometry, frameMaterial);
        this.frame.position.y = 150;

        // 매트리스
        const mattressGeometry = new THREE.BoxGeometry(5800, 400, 2800);
        const mattressMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff, // 흰색 매트리스
            roughness: 1,
        });
        this.mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
        this.mattress.position.y = 100; // 프레임 위에 위치

        // 씬에 추가
        this.scene.add(this.frame);
        this.scene.add(this.mattress);
    }
}
