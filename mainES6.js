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

	})
	.catch(error => console.error(error))

const hideElement = el => el.style.display = "none";

function createFlippers(arr) {
	arr.map((book) => {
		//		console.log(book);
		templateFilpperBook(book);

	})
}

const templateFilpperBook = book => {
	//assigment destructuring
	let {portada,titulo,descripcion} = book;
	
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
	back.innerHTML =
		`<h3>${titulo}</h3>
			<p>${descripcion}</p>
			<button class="btn">More info</button>`
	flipperContainer.appendChild(divFlipper);
	divFlipper.appendChild(front);
	divFlipper.appendChild(back);
	containerDiv.appendChild(flipperContainer);
}



 