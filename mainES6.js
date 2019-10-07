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

		var qsRegex;

		// init Isotope
		var $grid = $("#library").isotope({
			itemSelector: '.flip-container',
			layoutMode: 'fitRows',
			filter: function () {
				return qsRegex ? $(this).text().match(qsRegex) : true;
			}
		});


		// use value of search field to filter
		var $quicksearch = $('.quicksearch').keyup(debounce(function () {
			qsRegex = new RegExp($quicksearch.val(), 'gi');
			$grid.isotope();

			if (!$grid.data('isotope').filteredItems.length) {
				$('#noResult').show();
			} else {
				$('#noResult').hide();
			}
		}, 200));

	})
	.catch(error => console.error(error))

const hideElement = el => el.style.display = "none";

function createFlippers(arr) {
	ga('send', 'event', ["create"], ["divCreation"], ["label"], [""], [""]);
	arr.map((book) => {
		//		console.log(book);
		templateFilpperBook(book);

	})
}

const templateFilpperBook = book => {
	//assigment destructuring
	let {
		portada,
		titulo,
		descripcion,
		detalle
	} = book;

	let flipperContainer = document.createElement("div");
	flipperContainer.setAttribute("class", "flip-container");

	let divFlipper = document.createElement("div");
	divFlipper.setAttribute("class", "flipper");
	let front = document.createElement("div");
	front.setAttribute("class", "front");

	//using template literals
	front.innerHTML =
		`<img src=${portada} class="img-repsonsive" />`
	let back = document.createElement("div");
	back.setAttribute("class", "back");
	let button= document.createElement("button");
 	button.setAttribute("class","btn");
	button.setAttribute("data-button","more");
	button.innerHTML= `<a href=${detalle} data-fancybox data-caption>More info </a>`
	back.innerHTML =
		`<h3>${titulo}</h3>
			<p>${descripcion}</p>`
 	
	back.appendChild(button);
	flipperContainer.appendChild(divFlipper);
	divFlipper.appendChild(front);
	divFlipper.appendChild(back);
	containerDiv.appendChild(flipperContainer);
}



// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
	var timeout;
	return function debounced() {
		if (timeout) {
			clearTimeout(timeout);
		}

		function delayed() {
			fn();
			timeout = null;
		}
		timeout = setTimeout(delayed, threshold || 100);
	}
}
