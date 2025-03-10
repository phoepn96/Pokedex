function pokemonCardTemp(pokemonData, index) {
	return `<div class="pokemonCardDiv" id="card${index}" onclick="playPokemonSound('${pokemonData.cries.latest}')">
        <div id="headlineDiv${index}" class="headlineContainer"><h3>${
					pokemonData["name"].charAt(0).toUpperCase() +
					pokemonData["name"].slice(1)
				}</h3></div>
        
    
    
    
    </div>`;
}
