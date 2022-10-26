let main = document.querySelector("main")

async function getPokemon() {
    let pokemon = Math.floor(Math.random() * 400)
    //saving the api response in a constant
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    console.log(data);
    createPokemonCard(data)
  }
  const cardsection = document.createElement("section")
  function createPokemonCard(pokemonData){
    const h2 = document.createElement("h2");
    h2.innerHTML = pokemonData.name;

    const sprite = document.createElement("img")
    sprite.src = pokemonData.sprites.front_default

    const type = document.createElement("p")
    let types = ""
    pokemonData.types.forEach( (x)=>{types += x.type.name +" "})
    type.innerHTML = `type(s): ${types}`
    
    const exp = document.createElement("p")
    const pokedex = document.createElement("p")
    pokedex.innerHTML = `pokedex index: ${pokemonData.id}`
    exp.innerHTML = `base experience: ${pokemonData.base_experience}`
    
    cardsection.append(h2,sprite, type,pokedex, exp)
    cardsection.classList.add("pokemon")
    main.append(cardsection);
};

function initialiseThreeCards(){
    for (let i = 0; i < 3; i++){
        getPokemon()
    }
    // create the event listeners as well
}

initialiseThreeCards()

cardsection.addEventListener(('click'), () =>
{
    cardsection.replaceChildren()
    initialiseThreeCards()
})