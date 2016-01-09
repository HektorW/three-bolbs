
import { PerspectiveCamera } from 'three';

class Camera extends PerspectiveCamera {

	constructor() {
		super(50, window.innerWidth / window.innerHeight, 1, 1000);
	}

	resize(width, height) {
		this.aspect = width / height;
		this.updateProjectionMatrix();
	}
}

export default Camera;
