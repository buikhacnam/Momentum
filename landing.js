
//DOM element
const time = document.getElementById('time'),
	greeting = document.getElementById('greeting'),
	name = document.getElementById('name'),
	focus = document.getElementById('focus'),
	container = document.querySelector('.container');

//Show Time
function showTime() {
	let today = new Date(),
	hour = today.getHours(),
	min = today.getMinutes(),
	sec = today.getSeconds();

	//set amPm
	const amPm = hour >= 12 ? "PM" : "AM";

	//12h format
	hour = hour % 12 || 12;

	//Output time
	time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;

	setTimeout(showTime, 1000);


}

//add Zaros
function addZero(n) {
	return n < 10? '0' + n : n; 
}

//setBackGround and Greeting
function setBgGreet() {
	let today = new Date();
	let hour = today.getHours();

	if (hour < 12) {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1528163073829-df0b94e210a8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83b5db9f6094f5de650156ea3ddc9f0e&auto=format&fit=crop&w=1920') ";
		greeting.textContent = 'Good Moring';
	}else if (hour < 18) {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1531387079845-b3bcdd83a14c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e8e37aac5488d819ce9ee1dd83988de3&auto=format&fit=crop&w=1920')  ";
		greeting.textContent = 'Good Afternoon';
	} else {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c4a086173e78551f89a3e22d03a8053f&auto=format&fit=crop&w=1920')";
		greeting.textContent = 'Good Evening';
	}
}

function getName() {
	if (localStorage.getItem('name') === null) {
		name.textContent = '[enter name]';
	} else {
		name.textContent = localStorage.getItem('name');
	}
}

function setName(e) {
	if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
      	localStorage.setItem('name', e.target.innerText);
      	name.blur();
      }
	} else {
		localStorage.setItem('name', e.target.innerText)
	}
}

function getFocus() {
	if (localStorage.getItem('focus') === null) {
		focus.textContent = '[enter focus]';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
}

function setFocus(e) {
	if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
      	localStorage.setItem('focus', e.target.innerText);
      	focus.blur();
      }
	} else {
		localStorage.setItem('focus', e.target.innerText)
	}
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
setBgGreet();
getName();
getFocus();

console.log(name.innerText);