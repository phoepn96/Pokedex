async function fetchPokemon(){
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur")

        console.log(response, "test");

        if(!response.ok){
            throw new Error("couldnt fetch data");
        }

        const data = await response.json();

        console.log(data)
        
    } catch (error) {
        console.error(error);
    }

    await fetchGermanName();
}

async function fetchGermanName() {
    try{
    const response = await fetch("https://pokeapi.co/api/v2/language/6/");

    if(!response.ok){
        throw new Error("couldnt fetch data");
    }

    const data = await response.json();

    console.log(data)
}
catch(error){
    console.error(error)
}
}