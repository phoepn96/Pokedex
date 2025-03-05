function pokemonCardTemp(pokemonData, index) {
	return `<div class="pokemonCardDiv" id="card${index}">
        <h3>${
					pokemonData["name"].charAt(0).toUpperCase() +
					pokemonData["name"].slice(1)
				}</h3>
        
    
    
    
    </div>`;
}
