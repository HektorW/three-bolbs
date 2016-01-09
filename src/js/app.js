
import THREE from 'three';

// Objects
import Bolb from './objects/Bolb';
import Camera from './objects/Camera';

// Utils
import { randRange } from './utils/Random';

import Time from './Time';


class App {

	constructor() {
		this.element = document.querySelector('#app');

		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();

		this.camera = new Camera();
		this.time = new Time();

		this.renderer.setClearColor(0x11111);
		this.element.appendChild(this.renderer.domElement);

		// Bind
		this.update = this.update.bind(this);

		// Events
		window.addEventListener('resize', () => this.resize);

		this.setupScene();
		this.resize();
	}

	start() {
		this.running = true;
		this.lastTime = performance.now();
		requestAnimationFrame(this.update);
	}

	resize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.camera.resize(this.width, this.height);
		this.renderer.setSize(this.width, this.height);
	}




	setupScene() {
		this.camera.position.y = 25;
		this.camera.position.z = 100;

		// Floor
		this.floor = new THREE.Mesh(
			new THREE.PlaneGeometry(100, 100),
			new THREE.MeshPhongMaterial({ color: 0x111111 })
		);
		this.floor.rotateX(Math.PI * -.5);
		this.scene.add(this.floor);


		// Bolbs
		this.bolbs = new Array(10);
		for (let i = 0; i < this.bolbs.length; i++) {
			this.bolbs[i] = new Bolb(
				randRange(-50, 50),
				randRange(5, 15),
				randRange(-50, 50)
			);
			this.scene.add(this.bolbs[i]);
		}
	}





	update(t) {
		if (this.running) {
			requestAnimationFrame(this.update);
		}

		this.time.update(t);

		for (let i = 0; i < this.bolbs.length; i++) {
			this.bolbs[i].update(this.time);
		}

		this.render();
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}
}


export default App;
