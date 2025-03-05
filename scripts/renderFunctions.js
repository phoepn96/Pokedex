const contentDivRef = document.getElementById("content");
let cardAmount = 20;

async function getBaseData(amount) {
	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`
		);

		if (!response.ok) {
			throw new Error("couldnt fetch pokemon data!");
		}
		const data = await response.json();

		return data;
	} catch {
		console.error(error);
	}
}

async function getNameData() {
	contentDivRef.innerHTML = "";
	const pokemonData = await getBaseData(cardAmount);

	Object.keys(pokemonData["results"]).forEach((index) => {
		let pokemonUrl = pokemonData["results"][index]["url"];

		getPokemonData(pokemonUrl, index);
	});
}

async function getPokemonData(url, index) {
	try {
		const response = await fetch(`${url}`);

		if (!response.ok) {
			throw new Error();
		}

		const specificPokemonData = await response.json();
		renderPokemonData(specificPokemonData, index);
	} catch {
		console.error(error);
	}
}

async function renderPokemonData(specificPokemonData, index) {
	console.log(specificPokemonData);
	contentDivRef.innerHTML += pokemonCardTemp(specificPokemonData, index);

	addPokemonImage(specificPokemonData, index);
	addPokemonTypes(specificPokemonData, index);
}

async function addPokemonImage(specificPokemonData, index) {
	const pokemonImageUrl =
		specificPokemonData["sprites"]["other"]["official-artwork"]["front_shiny"];
	const pokemonCardRef = document.getElementById(`card${index}`);
	pokemonCardRef.innerHTML += `<img src="${pokemonImageUrl}">`;
}

async function addPokemonTypes(specificPokemonData, index) {
	console.log("test");
	Object.keys(specificPokemonData["types"]).forEach((slot) => {
		pokemonType = specificPokemonData["types"][slot]["type"]["name"];
		const pokemonCardRef = document.getElementById(`card${index}`);
		pokemonCardRef.innerHTML += `<p>${pokemonType}</p>`;
	});
}
