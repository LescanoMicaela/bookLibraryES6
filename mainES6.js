//Refactoring to ES6

const containerDiv = document.getElementById("library");

const url = "https://api.myjson.com/bins/udbm5";
const getData = (url) => fetch(url);

getData(url)
.then(result => result.json())
.then(response => console.log(response))
.catch(error => console.error(error))
