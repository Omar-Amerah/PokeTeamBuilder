let main = document.querySelector("main")
let pokemonTeam = [] 
const enemylist = []
const clicked = ""
const cardsection = document.createElement("section")

async function getPokemon() {
    let pokemon = Math.floor(Math.random() * 400)
    //saving the api response in a constant
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    return data
  }
  
function createPokemonCard(pokemonData){
    
    const card = document.createElement("div")

    const p = document.createElement("p");
    p.innerHTML = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

    const sprite = document.createElement("img")
    sprite.src = pokemonData.sprites.front_default
    sprite.classList.add("sprite")

    const type = document.createElement("p")
    let types = ""
    pokemonData.types.forEach( (x)=>{types += x.type.name +" "})
    type.innerHTML = `Type(s): ${types}`
    if(pokemonData.types[1] === undefined)
    {
        type.innerHTML = 'Type(s): ' + pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1)
    }
    else
    {
        type.innerHTML = 'Type(s): ' + pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1) + ', ' + pokemonData.types[1].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1)
    }

    //.charAt(0).toUpperCase() + data.name.slice(1)

    const exp = document.createElement("p")
    const pokedex = document.createElement("p")
    pokedex.innerHTML = `Pokedex Index: ${pokemonData.id}`
    exp.innerHTML = `Base Stat: ${pokemonData.base_experience}`
    
    card.append(p,sprite, type,pokedex, exp)
    card.classList.add("pokemon")
    cardsection.append(card)
    main.prepend(cardsection);

    card.addEventListener(('click'), () => {
        pokemonTeam.push(pokemonData)
        addToTeam(p, sprite)
        createEnemy()
    })
};

function initialiseThreeCards(){
    for (let i = 0; i < 3; i++){
        getPokemon().then(data => {
            createPokemonCard(data);
        })
        .catch(err => {
          console.log("err");
        }); 
    }
}


cardsection.addEventListener(('click'), () => {
    cardsection.replaceChildren()
    if (pokemonTeam.length === 6){
        main.classList.add("battle")
        document.querySelector("header").replaceChildren()
        alert("reached team capacity - time to battle!")
        beginBattle()
    }else{
        initialiseThreeCards()
    }
})

function addToTeam(name, sprite){
    teamSection = document.querySelector("#team")
    const entry = document.createElement("section")
    
    entry.append(name, sprite)
    teamSection.appendChild(entry)
}

function pushEnemy(data)
{
    enemylist.push(data)
    console.log(enemylist)
    
}

function createEnemy()
{
        getPokemon().then(data => {
            pushEnemy(data);
            enemySection = document.querySelector("#enemy")
            const entry = document.createElement("section")
            
            const sprite = document.createElement("img")
            sprite.src =  data.sprites.front_default
            sprite.classList.add("sprite")
            entry.append((data.name.charAt(0).toUpperCase() + data.name.slice(1)), sprite)
            enemySection.appendChild(entry)
        })
        .catch(err => {
          console.log("err");
        });
}

function battle(playername){
    // enemyname = randomly chosen from the arra
    if(playername.id < enemyname.id){
        //element.innerHTML(`${playername} is knocked out`)
    }
    else{
        //element.innerHTML(`${enemyname} is knocked out`)
    }
}

function beginBattle(){
    let battleSection = document.querySelector("#battle")
    // add event listeners to the pokemon
    let teamList = document.querySelector("#team")
    teamList.childNodes.forEach((child, pos)=>{
        child.addEventListener("click", ()=>{
            teamList.removeChild(child)
            battleSection.append(child)
            // battle(pokemonTeam[pos]) --> need to choose the enemy pokemon too
        })
    })


    // choose an enemy pokemon
    // move pokemon into place in battle arena
    // and remove from team list
    // call the battle function
}

initialiseThreeCards()