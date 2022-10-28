let main = document.querySelector("main")
let pokemonTeam = [] 
const enemyTeam = []
let pokemonTeamName = []
let clicked = false
let pfightpoke
let cfightpoke

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
            
            //Creating an alertDiv, contains message and button
            // const alertDiv = document.createElement("div")
            // alertDiv.id = "container";
            // //Creating an alertMessage, contains only message
            // const alertMessage = document.createElement("div")
            // alertMessage.classList.add("message");
            // alertMessage.innerHTML = "reached team capacity - time to battle"
            // //Creating an alertButton, contains only the 'Okay!' button
            // const alertButton = document.createElement("button")
            // alertButton.classList.add("okay")
            // alertButton.innerHTML = "Okay!"


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
}

//Picks and pushes a random pokemon to the enemy array
function createEnemy()
{
        getPokemon().then(data => {
            enemyTeam.push(data)
            enemySection = document.querySelector("#enemy")
            
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

// function battle(player){
//     // let element = document.querySelector("#battleText")
//     let loop = 6;
//     let teamList = document.querySelector(`#enemy`)
//     let pos = Math.floor(Math.random() * enemylist.length)
//     enemy = enemylist[pos]
//     enemylist.pop(pos)
//     movePokemon(teamList.childNodes[pos + 1], "enemy", "cpu")
//     if(player.id < enemy.id){
//         // element.innerHTML= (`${player.name} is knocked out`)
//         console.log("lose")
//         removePokemon(player, "player")
//     }
//     else{
//         // element.innerHTML = (`${enemy.name} is knocked out`)
//         console.log("win")
//         removePokemon(enemy, "cpu")
//         battle(player)    
//     }
// }

/*
function beginBattle(){
    // add event listeners to the player pokemon
    let teamList = document.querySelector("#team")
    let player = document.createElement("section")
    let cpu = document.createElement("section")
    cpu.id = "cpu"
    player.id = "player"
    // let text = document.createElement("p")
    // text.id = "battleText"
    // text.innerHTML = "Battle!"
    document.querySelector("#battle").append(player, cpu)
    teamList.childNodes.forEach((child)=>{
        if (child.innerHTML !== "Your Team:"){
            child.addEventListener("click", ()=>{
                movePokemon(child, "team", "player")
                let pokemonTeamName = []
                pokemonTeam.forEach((element)=>{
                    pokemonTeamName.push(element.name.charAt(0).toUpperCase() + element.name.slice(1))
                })
                let index = pokemonTeamName.indexOf(child.querySelector("p").innerHTML)
                child.removeChild(child.querySelector("p"))
                battle(pokemonTeam[index], winningPokemon)
                pokemonTeam.pop(index)
            })
        }})
}
function movePokemon(child,id, name){
    
    let battleSection = document.querySelector(`#${name}`)
    teamList.removeChild(child)
    battleSection.append(child)
    console.log(child, "child")
    child.classList.add(name)
}

function battle(playerPokemon){
    if (winningPokemon === null){
        console.log("choosing an enemy")
        let pos = Math.floor(Math.random() * enemylist.length)
        console.log("nodes:" ,document.querySelector("#enemy").childNodes)
        movePokemon(document.querySelector("#enemy").childNodes[pos + 3], "enemy", "cpu")
        // winningPokemon = enemylist[pos]
        console.log(enemylist)
        winningPokemon = enemylist.pop(pos)
        console.log(enemylist)
        // winningPokemon = enemyPokemon
    }
    console.log(playerPokemon.id)
    if(playerPokemon.id < winningPokemon.id){
        console.log("Lost:" + playerPokemon.id, winningPokemon.id)
            removePokemon(player, "player")
            if (pokemonTeam.length === 0){
                alert("you have lost")
            }
        }else{
        console.log("Win:" + playerPokemon.id, winningPokemon.id)
        removePokemon(enemy, "cpu")
        if (enemylist.length !==0 ){
            winningPokemon = null
            battle(player)  
                
        }
        else{
            alert("You've won")
        }
    }
}
function removePokemon(team){
    let battleSection = document.querySelector(`#${team}`)
    battleSection.replaceChildren()
}
*/

const battlearea = document.querySelector("#battle")
let teamList = document.querySelector("#team")
let enemyList = document.querySelector("#enemy")

function test()
{
    teamList.childNodes.forEach((child)=>{
        if (child.innerHTML !== "Your Team:"){
            child.addEventListener("click", ()=>{
                let index = pokemonTeamName.indexOf(child.querySelector("p").innerHTML)
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
                return "Hello"
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
            enemyTeam.splice(enemyTeam[pos], 1)
            child.querySelector("img").classList.add("cpu")
            main.appendChild(child.querySelector("img"))
            enemyList.removeChild(child)
            return false;
        }
    }
} 



async function battlefunction()
{
    main.classList.add("fight")
    await new Promise(resolve => {
        setTimeout(() => {
            main.classList.remove("fight")
            main.removeChild(main.querySelector(".player"))
            main.removeChild(main.querySelector(".cpu"))
            console.log(pfightpoke)
            console.log(cfightpoke)
            
            console.log(cfightpoke.querySelector("img"))

            let pos;
            for (child of pokemonTeam){
                if (child.name.toUpperCase() === pfightpoke.querySelector("p").innerHTML.toUpperCase()){
                    pos = pokemonTeam.indexOf(child)
                }
            }
            
            let index
            for (child of enemyTeam){
                if (child.name.toUpperCase() === cfightpoke.querySelector("p").innerHTML.toUpperCase()){
                    index = enemyTeam.indexOf(child)
                }
            }


            let sprite = document.createElement("img")
            sprite.classList.add("sprite")
            let name = document.createElement("p")
            name.classList.add("poketitle")
            
            
            
            sprite.src = pokemonTeam[pos].sprites.front_default
            name.innerHTML = pokemonTeam[pos].name.charAt(0).toUpperCase() + pokemonTeam[pos].name.slice(1)
            addToTeam(name, sprite )
            pokemonTeam.push(pokemonTeam.pop(pos))
            
            clicked = false
            test() 
        }, 3000);
      });
    
}


initialiseThreeCards()
// battlefunction()