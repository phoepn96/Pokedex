function pokemonCardTemp(pokemonData){
    return `<div class="pokemonCardDiv">
        <h3>${(pokemonData["name"].charAt(0).toUpperCase() + pokemonData["name"].slice(1))}</h3>
        <p>${Object.keys(pokemonData["types"]).forEach((type)=>{
            Object.keys(pokemonData["types"][type]["name"])
        })}</p>
    
    
    
    </div>`
}