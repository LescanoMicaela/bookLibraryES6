//Refactoring to ES6

const containerDiv = document.getElementById("library");
const loader = document.getElementById("loading");
const url = "https://api.myjson.com/bins/udbm5";
const getData = (url) => fetch(url);
let books = {};

getData(url)
	.then(result => result.json())
	.then(response => {
		books = response.books;
		createFlippers(books);
		hideElement(loader);
	})
	.catch(error => console.error(error))

const hideElement = (el) => el.style.display = "none";

function createFlippers(arr) {
	arr.map((book) => {
		console.log(book);
		let divContainer = document.createElement("div");
		divContainer.setAttribute("class", "flip-container");

		let divFlipper = document.createElement("div");
		divFlipper.setAttribute("class", "flipper");
		let front = document.createElement("div");
		front.setAttribute("class", "front");
		
		//using template literals
		front.innerHTML =
			`<img src=${book.portada} class="img-repsonsive" />`
		let back = document.createElement("div");
		back.setAttribute("class", "back");
		back.innerHTML =
			`<h3>${book.titulo}</h3>
			<p>${book.descripcion}</p>
			<button class="btn">More info</button>`
		divContainer.appendChild(divFlipper);
		divFlipper.appendChild(front);
		divFlipper.appendChild(back);
		containerDiv.appendChild(divContainer);
	})
}