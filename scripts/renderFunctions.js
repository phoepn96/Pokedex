const contentDivRef = document.getElementById("content");
let cardAmount = 20;


async function getBaseData(amount) {
    try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`);

    if(!response.ok){
        throw new Error("couldnt fetch pokemon data!")
    }
    const data = await response.json();
  
    return data;
}
    catch{
    
    console.error(error)
}

    
}

async function getNameData(){

    contentDivRef.innerHTML = "";
    const pokemonData = await getBaseData(cardAmount);


    Object.keys(pokemonData["results"]).forEach( (index) => {
        let pokemonUrl = pokemonData["results"][index]["url"];
        
        getPokemonData(pokemonUrl);
    });
}

async function getPokemonData(url){

    try{
        
        const response = await fetch(`${url}`)

        if(!response.ok){
            throw new Error
        }

        const specificPokemonData = await response.json();
        renderPokemonData(specificPokemonData);
    
}
    catch{
        console.error(error);
    }
   
}

async function renderPokemonData(specificPokemonData){
    console.log(specificPokemonData);
  contentDivRef.innerHTML += pokemonCardTemp(specificPokemonData);

}