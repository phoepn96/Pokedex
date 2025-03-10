const contentDivRef = document.getElementById("content");
let cardAmount = 200;

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
			throw new Error("couldnt fetch specific pokemon Data");
		}

		const specificPokemonData = await response.json();
		renderPokemonData(specificPokemonData, index);
        console.log(specificPokemonData);
	} catch {
		console.error("Something is not working");
	}
}

async function renderPokemonData(specificPokemonData, index) {
	console.log(specificPokemonData);
	contentDivRef.innerHTML += pokemonCardTemp(specificPokemonData, index);

	addPokemonImage(specificPokemonData, index);
    addPokemonHP(specificPokemonData, index);
	addPokemonTypes(specificPokemonData, index);
    setBackgroundColors(specificPokemonData, index);
    addAbilitys(specificPokemonData, index);
}

async function addPokemonImage(specificPokemonData, index) {
	const pokemonImageUrl =
		specificPokemonData["sprites"]["other"]["official-artwork"]["front_shiny"];
	const pokemonCardRef = document.getElementById(`card${index}`);
	pokemonCardRef.innerHTML += `<img src="${pokemonImageUrl}" class="pokemonImg" id="pokeImg${index}">`;
}

async function addPokemonTypes(specificPokemonData, index) {
	const headlineDivRef = document.getElementById(`headlineDiv${index}`)
    headlineDivRef.innerHTML += `<div id="typeDiv${index}" class="typeDiv"></div>`

    const typeSlots = Object.keys(specificPokemonData["types"]);

    for(const slot of typeSlots){
        let pokemonType = specificPokemonData.types[slot].type.name;
        const typeDiv = document.getElementById(`typeDiv${index}`);
        typeImgResponse = await getTypeImg(pokemonType);
        typeDiv.innerHTML += `<img src="${typeImgResponse}" class="typeImg" draggable="false">`;
    }
}

async function addPokemonHP(specificPokemonData, index){
    const headlineDivRef = document.getElementById(`headlineDiv${index}`);
    headlineDivRef.innerHTML += `<span>${specificPokemonData.stats[0].base_stat} HP</span>`;
}

async function addAbilitys(specificPokemonData, index){
    const pokemonCardRef = document.getElementById(`card${index}`);
    for(let i = 0; i < 2; i++){
    const cleanMoves = specificPokemonData.abilities[i].ability.name.split("-");
    const finishedMove = [];
    for(const word of cleanMoves){
        finishedMove.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    pokemonCardRef.insertAdjacentHTML("beforeend", `<div id="moveDiv${index}-${i}"><h4>${finishedMove.join(" ")}</h4></div>`);
	addAbilityText(specificPokemonData, index, i);
    }
	
}

async function playPokemonSound(soundUrl){
	const pokemonCry = new Audio(soundUrl);
	pokemonCry.volume = 0.02;
	try{
		pokemonCry.play();
	}
	catch(error){
		console.error(error);
	}
   
}

async function addAbilityText(specificPokemonData, index, moveIndex){
	const moveDiv = document.getElementById(`moveDiv${index}-${moveIndex}`);
	const abilityData = await getAbilityData(specificPokemonData, moveIndex);
	const englishAbilityText = await filterEnglishAbilityText(abilityData);
	
	moveDiv.insertAdjacentHTML("beforeend", `<span>${englishAbilityText[0].short_effect}</span>`)

}

async function getAbilityData(specificPokemonData, moveIndex){
	
	try{
		const response = await fetch(specificPokemonData.abilities[moveIndex].ability.url)
		if(!response.ok){
			throw new Error("couldnt fetch abilityData")
		}
		const abilityData = await response.json();
		return abilityData;
	}

	catch(error){
		console.error(error);
	}

}

async function filterEnglishAbilityText(abilityData){
	console.log(abilityData);
	const englishAbilityText = abilityData.effect_entries.filter((entry) =>
		entry.language.name === "en"
	);
	console.log(englishAbilityText);
	return englishAbilityText;
}