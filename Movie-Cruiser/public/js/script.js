
let movieLst= [];
function getMovies() {
	let moviesURL = 'http://localhost:3000/movies';
	var bookContainer = document.querySelector('#moviesList');
	return fetch(`${moviesURL}`)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		return response.json();
	})
	.then((data) => {
		for(let i=0;i<data.length ; i++){
			bookContainer.innerHTML += `
			<ul id='movie-${data[i].id}'>
			<li id='id' value='${data[i].id}'>${data[i].id}</li>
			<li id='title' value='${data[i].title}'>${data[i].title}</li>
			<li id='path' value='${data[i].posterPath}'>${data[i].posterPath}</li>
			<button id=${data[i].id} onclick="addFavourite(this.id)">add</button>
			</ul>`
		}
		return data;
		done();
	})
	.catch((err) =>{
		return err;
		done();
	})
}

function getFavourites() {
	let favouritessURL = 'http://localhost:3000/favourites';
	var favContainer = document.querySelector('#favouritesList');
	return fetch(`${favouritessURL}`)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		return response.json();
	})
	.then((data) => {
		for(let i=0;i<data.length ; i++){
			favContainer.innerHTML += `
			<li>${data[i].id}</li>
			<li>${data[i].title}</li>
			<li>${data[i].posterPath}</li>`
		}
		return data;
		done();
	})
	.catch((err) =>{
		return err;
		done();
	})
}

function addFavourite(id) {
	let favouritessURL = 'http://localhost:3000/favourites';
	if (movieLst.find(element => element=== id) === undefined) {
		movieLst.push(id);
		var parent = document.getElementById('movie-'+id);
		var title = parent.querySelector('#title').getAttribute("value");
		var path = parent.querySelector('#path').getAttribute("value");
		// alert(id+" "+title+" "+path)
	
		const data = {
			id: id,
			title: title,
			path: path, 
		};
		fetch(`${favouritessURL}`, {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return this.getFavourites();
			})
			.then(data => {
				return data;//this.getFavourites();
				done();
			})
			.catch((error) => {
				movieLst.pop();
				done();
			});

	} else {
		throw new Error('Movie is already added to favourites');
	}
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};
