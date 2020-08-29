
//DOM element
const time = document.getElementById('time'),
	greeting = document.getElementById('greeting'),
	name = document.getElementById('name'),
	focus = document.getElementById('focus'),
	container = document.querySelector('.container'),
	searchbox = document.querySelector('.search-box'),
	api = {
		key: "7845b36e72eeebc7131617478b064fe6",
		base: "https://api.openweathermap.org/data/2.5/"
	};


//Show Time
function showTime() {
	let today = new Date(),
	hour = today.getHours(),
	min = today.getMinutes(),
	sec = today.getSeconds();

	

	//Output time
	time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

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
		greeting.textContent = 'Good Morning,';
	}else if (hour < 18) {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1528163073829-df0b94e210a8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83b5db9f6094f5de650156ea3ddc9f0e&auto=format&fit=crop&w=1920') ";
		
		greeting.textContent = 'Good Afternoon,';
	} else {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c4a086173e78551f89a3e22d03a8053f&auto=format&fit=crop&w=1920')";
		greeting.textContent = 'Good Evening,';
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

//--------------about weather--------------------

searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
	if (e.which == 13 || e.keyCode == 13) {
		searchbox.blur();
		getResult(searchbox.value);
		searchbox.value = "";
	}
}

function getResult(query) {
	fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then(weather => {
			return weather.json();
		}).then(displayResult);
}

function displayResult(weather) {
	console.log(weather);
	let city = document.querySelector('.location .city h1');
	city.innerText = `${weather.name},${weather.sys.country}`;

	let temp = document.querySelector('.current .temp h1');
	temp.innerText = `${weather.main.temp}°C`;

	let weather_el = document.querySelector('.current .weather h3');
  weather_el.innerText = weather.weather[0].main;

  	let now = new Date();
  	let date = document.querySelector('.location .date h3');
  	date.innerText = dateBuilder(now);
}

function dateBuilder(now) {
   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;

}

document.addEventListener("DOMContentLoaded", () => {
	getResult('Hanoi');
})
