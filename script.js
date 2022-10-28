let main = document.querySelector("main")
let pokemonTeam = [] 
let enemyTeam = []
let pokemonTeamName = []
let clicked = false
let pfightpoke
let cfightpoke

//Music audio listeners
const battleTheme = document.querySelector("#battleMusic");
battleTheme.addEventListener("click", () =>{
    const fight = new Audio();
    fight.src = "1-15._Battle_Vs._Trainer.mp3"
    fight.play();
})

const mainTheme = document.querySelector("#mainMusic");
mainTheme.addEventListener("click", () =>{
    const main = new Audio();
    main.src = "Pokemon_Theme_Song_Sound_Effect (1).mp3";
    main.play();
})
const cardsection = document.createElement("section")

//Function to get a random pokemon from PokeAPI and return it
async function getPokemon() {
    let pokemon = Math.floor(Math.random() * 400)
    //saving the api response in a constant
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    return data
  } 
  
//Function to create the 3 pokemon cards at the start
function createPokemonCard(pokemonData){
    const card = document.createElement("div")
    const title = document.createElement("p");
    title.innerHTML = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    title.classList.add("poketitle")

    const sprite = document.createElement("img")
    sprite.src = pokemonData.sprites.front_default
    sprite.classList.add("sprite")

    const type = document.createElement("p")
    
    pokemonData.types[1] === undefined ? type.innerHTML = 'Type(s): ' + pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1) :
    type.innerHTML = 'Type(s): ' + pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1) + ', ' + pokemonData.types[1].type.name.charAt(0).toUpperCase() + pokemonData.types[1].type.name.slice(1)

    const exp = document.createElement("p")
    const pokedex = document.createElement("p")
    pokedex.innerHTML = `Pokedex Index: ${pokemonData.id}`
    exp.innerHTML = `Base Stat: ${pokemonData.base_experience}`
    
    card.append(title,sprite, type,pokedex, exp)
    card.classList.add("pokemon")
    card.classList.add("innerCard")
    cardsection.append(card)
    main.insertBefore(cardsection, document.querySelector("#enemy"));

    /*When a card is clicked the chosen pokemon is pushed to an array
    A random enemy pokemon is chosen
    and 3 new pokemon are picked and created
    and if 6 are chosen arena is created
    */
    card.addEventListener(('click'), () => {
        pokemonTeam.push(pokemonData)
        addToTeam(title, sprite)
        createEnemy()
        cardsection.replaceChildren()
        
        if (pokemonTeam.length === 6){
            main.classList.add("battle")
            document.querySelector("header").replaceChildren()
            alert("reached team capacity - time to battle!")
            pokemonTeam.forEach((element)=>{
                pokemonTeamName.push(element.name.charAt(0).toUpperCase() + element.name.slice(1))
            })
            test()
        }else{
            initialiseThreeCards()
        }
    })
};

//Function to create the 3 cards for the player to pick from
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

function addToTeam(name, sprite){
    teamSection = document.querySelector("#team")
    const entry = document.createElement("section")
    entry.classList.add("entry")
    entry.append(name, sprite)
    teamSection.appendChild(entry)
    return entry
}

const enemySection = document.querySelector("#enemy")

function addToEnemy(name, sprite){
    const entry = document.createElement("section")
    entry.classList.add("enemyentry")
    entry.append(name, sprite)
    enemySection.appendChild(entry)
}

//Picks and pushes a random pokemon to the enemy array
function createEnemy()
{
        getPokemon().then(data => {
            enemyTeam.push(data)
            const entry = document.createElement("section")
            const sprite = document.createElement("img")
            const etitle = document.createElement("p")
            etitle.classList.add("poketitle")
            etitle.innerHTML = (data.name.charAt(0).toUpperCase() + data.name.slice(1))
            sprite.src =  data.sprites.front_default
            sprite.classList.add("sprite")
            entry.append(etitle,sprite)
            entry.classList.add("enemyentry")
            enemySection.appendChild(entry)
        })
        .catch(err => {
          console.log("err");
        });
}

const battlearea = document.querySelector("#battle")
let teamList = document.querySelector("#team")
let enemyList = document.querySelector("#enemy")

function test()
{
    teamList.childNodes.forEach((child)=>{
        if (child.innerHTML !== "Your Team:"){
            child.addEventListener("click", ()=>{
                let value = child.querySelector("p").innerHTML
                let index = pokemonTeamName.indexOf(value)
                pfightpoke = child
                removeplayerPokemon(pokemonTeam[index].name)
                battlefunction()
                
            })
        }
    })
    
}

function removeplayerPokemon(chosenPokemon)
{
    teamList.querySelectorAll(".entry").forEach((child)=>{
        if(child.innerHTML !== "Your Team:"){
            if((child.querySelector(".poketitle")).innerHTML.toUpperCase() === chosenPokemon.toUpperCase() && clicked === false)
            {
                child.querySelector("img").classList.add("player")
                main.appendChild(child.querySelector("img"))
                teamList.removeChild(child)
                clicked = true
                removeenemyPokemon()
                return false
            }
        }
    })
}

function removeenemyPokemon()
{
    let pos = Math.floor(Math.random() * enemyTeam.length)
    
    for (child of enemyList.querySelectorAll(".enemyentry")){
        if((child.querySelector(".poketitle")).innerHTML.toUpperCase() === enemyTeam[pos].name.toUpperCase())
        {
            cfightpoke = child
            child.querySelector("img").classList.add("cpu")
            main.appendChild(child.querySelector("img"))
            enemyList.removeChild(child)
            return false;
        }
    }
} 

async function battlefunction(){
    main.classList.add("fight")
    await new Promise(resolve => {
        setTimeout(() => {
            main.classList.remove("fight")
            main.removeChild(main.querySelector(".player"))
            main.removeChild(main.querySelector(".cpu"))

            let pos;
            for (child of pokemonTeam){
                if (child.name.toUpperCase() === pfightpoke.querySelector("p").innerHTML.toUpperCase()){
                    pos = pokemonTeam.indexOf(child)
                }
            }
            
            let index;
            for (child of enemyTeam){
                if (child.name.toUpperCase() === cfightpoke.querySelector("p").innerHTML.toUpperCase()){
                    index = enemyTeam.indexOf(child)
                }
            }

            let sprite = document.createElement("img")
            sprite.classList.add("sprite")
            let name = document.createElement("p")
            name.classList.add("poketitle")

            if(pokemonTeam[pos].id < enemyTeam[index].id){
                sprite.src = enemyTeam[index].sprites.front_default
                name.innerHTML = enemyTeam[index].name.charAt(0).toUpperCase() + enemyTeam[index].name.slice(1)
                addToEnemy(name, sprite)
                enemyTeam.push(enemyTeam.splice(index,1)[0])
                pokemonTeam.splice(pos,1)
                pokemonTeamName.splice(pos,1)
            }else{
                sprite.src = pokemonTeam[pos].sprites.front_default
                name.innerHTML = pokemonTeam[pos].name.charAt(0).toUpperCase() + pokemonTeam[pos].name.slice(1)
                recreateEventListeners(addToTeam(name, sprite ))
                pokemonTeam.push(pokemonTeam.splice(pos,1)[0])
                pokemonTeamName.push(pokemonTeamName.splice(pos,1)[0])
                enemyTeam.splice(index,1)
            }
            
            if(pokemonTeam.length === 0)
            {
                main.replaceChildren()
                main.classList.remove("battle")
                main.classList.add("loseScreen")
                const tryagainbtn = document.createElement("button")
                tryagainbtn.classList.add("endbutton")
                tryagainbtn.innerHTML = "Refresh"
                main.append(tryagainbtn)
                tryagainbtn.addEventListener('click', () =>{
                    location.reload();
                })
                
            }
            else if(enemyTeam.length === 0)
            {
                main.replaceChildren()
                main.classList.remove("battle")
                main.classList.add("winScreen")
                
                const tryagainbtn = document.createElement("button")
                tryagainbtn.classList.add("endbutton")
                tryagainbtn.innerHTML = "Refresh"
                main.append(tryagainbtn)
                tryagainbtn.addEventListener('click', () =>{
                    location.reload();
                })
            }

            clicked = false
        },6000);
      }); 
}

function recreateEventListeners(child){
    child.addEventListener("click", ()=>{
        let pos = child.querySelector("p").innerHTML
        let index = pokemonTeamName.indexOf(pos)
        pfightpoke = child
        removeplayerPokemon(pokemonTeam[index].name)
        battlefunction()
    })
}

initialiseThreeCards()