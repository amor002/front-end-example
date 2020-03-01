

class CarouselController {
	constructor(carousel) {
		this.carousel = carousel;
		this.steppers = carousel.getElementsByClassName("stepper");
		this.currentPos = 0;

	}

	moveTo = (to, todo) => {

		const prevPos = this.currentPos;
		if(to > this.currentPos) {
			this.currentPos = to - 1;
			this.forward(todo, prevPos);
		}else if(to < this.currentPos) {
			this.currentPos = to + 1;
			this.backward(todo, prevPos);
		}
	}

	backward = (todo, prevPos) => {
		prevPos = prevPos || prevPos == 0 ? prevPos : this.currentPos;
		let views = this.carousel.getElementsByClassName("carousel-views")[0];
				
		if(this.currentPos == 0) {
			this.currentPos = views.getElementsByClassName("carousel-view").length;
		}
		
		views.style.transform = `translateX(${-(--this.currentPos)*100}%)`;
		if(todo) 
			todo(prevPos, this.currentPos); 
	}

	forward = (todo, prevPos) => {
		prevPos = prevPos || prevPos == 0 ? prevPos : this.currentPos;
		let views = this.carousel.getElementsByClassName("carousel-views")[0];
		if(this.currentPos == views.getElementsByClassName("carousel-view").length-1) {
			this.currentPos = -1;
		}
		views.style.transform = `translateX(${-(++this.currentPos)*100}%)`;
		if(todo) 
			todo(prevPos, this.currentPos); 
	}
}

let carousels = document.getElementsByClassName("carousel-classic");
let remotes = [];

function moveSteppers(controller, prevPos, newPos) {
	const steppers = controller.carousel.getElementsByClassName("stepper");
	steppers[prevPos].classList.toggle("active");
	steppers[newPos].classList.toggle("active");
}

function backward(i) {
	let controller = remotes[i];
	controller.backward((prevPos, newPos) => moveSteppers(controller, prevPos, newPos));
}

function forward(i) {
	let controller = remotes[i];
	controller.forward((prevPos, newPos) => moveSteppers(controller, prevPos, newPos));
}

function moveOn(i, j) {
	let controller = remotes[i];
	controller.moveTo(j, (prevPos, newPos) => moveSteppers(controller, prevPos, newPos));

}

for(let i=0;i<carousels.length;i++) {
	remotes.push(new CarouselController(carousels[i]));
	let views = Array(...carousels[i].getElementsByClassName("carousel-view"));
	let steppers = views.map( (view, j) => {
		return `<a href="#" onclick="moveOn(${i},${j})"><div class="stepper ${j == 0 ? 'active':''}"></div></a>`;
	});
	
	carousels[i].innerHTML += `
		<div class="carousel-fixed carousel-fixed-bottom">
		 ${steppers.join('\n')}
		</div>
		`;



	
}