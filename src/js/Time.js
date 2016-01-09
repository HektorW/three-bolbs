
class Time {
	constructor() {
		this.total = 0;
		this.delta = 0;
		this.now = 0;
		this.last = 0;
	}

	start() {

	}

	pause() {

	}

	update(now) {
		this.last = this.now;
		this.now = now;

		this.delta = this.now - this.last;
		this.total += this.delta;
	}
}

export default Time;
