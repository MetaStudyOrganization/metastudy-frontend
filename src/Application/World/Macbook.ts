import * as THREE from 'three';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Resources from '../Utils/Resources';

export default class Macbook {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    bakedModel: BakedModel;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;

        this.bakeModel();
        this.setModel();
    }

    bakeModel() {
        const model = this.resources.items.gltfModel.macbookModel;
        const texture = this.resources.items.texture.macbookTexture;

        this.bakedModel = new BakedModel(model, texture ?? null, 900);
    }

    setModel() {
        const modelGroup = this.bakedModel.getModel();

        // 💡 원하는 위치/회전/크기로 조절
        modelGroup.position.copy(new THREE.Vector3(0, -500, 900));
        modelGroup.rotation.y = Math.PI; // 예시: 180도 회전
        modelGroup.scale.set(5, 5, 5); // 예시: 크기 조정

        this.scene.add(modelGroup);
    }
    getScreenTransform() {
        return {
            position: new THREE.Vector3(0, 150, 200), // Macbook 화면 위치
            rotation: new THREE.Euler(0, 0, 0), // Macbook 화면 각도
        };
    }
}
