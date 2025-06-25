import * as THREE from 'three';

export default class BakedModel {
    model: LoadedModel;
    texture?: LoadedTexture;
    material?: THREE.MeshBasicMaterial;

    constructor(
        model: LoadedModel,
        texture?: LoadedTexture | null,
        scale?: number
    ) {
        this.model = model;

        if (texture) {
            texture.flipY = false;
            texture.encoding = THREE.sRGBEncoding;

            this.material = new THREE.MeshBasicMaterial({ map: texture });

            this.model.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (scale) child.scale.set(scale, scale, scale);
                    child.material = this.material;
                }
            });
        } else {
            // texture 없이도 스케일은 적용
            this.model.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && scale) {
                    child.scale.set(scale, scale, scale);
                }
            });
        }
    }

    getModel(): THREE.Group {
        return this.model.scene;
    }
}
