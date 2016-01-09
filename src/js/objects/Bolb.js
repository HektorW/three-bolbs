
import THREE from 'three';

// Utils
import { randRange } from '../utils/Random';

class Bolb extends THREE.Mesh {

	constructor(x, y, z) {
		super();

		this.color = 0x54be68;
		this.radius = 3;

		this.geometry = new THREE.SphereGeometry(this.radius);
		this.material = new THREE.MeshBasicMaterial({ color: this.color });

		this.position.x = x;
		this.position.y = y;
		this.position.z = z;

		this.vel = randRange(0.0001, 0.001);
	}

	update(time) {
		this.position.y += Math.cos(time.total * this.vel) * .25;
	}
}


export default Bolb;
