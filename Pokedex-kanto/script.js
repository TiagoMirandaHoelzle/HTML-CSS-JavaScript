const pokedex = document.getElementById("pokedex");
const inputName = document.getElementById("input-pokedex");
const btnPokedex = document.getElementById("btn-pokedex");
const erroMessage = document.getElementById("erro-message");

btnPokedex.addEventListener("click", async (e)=>{

    e.preventDefault();

    const inputPokemonName = inputName.value.toLowerCase().trim();

    if(inputPokemonName === ""){
        pokedex.innerHTML = "";
        fetchPokemon();
        return;
    }
    
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputPokemonName}`);
        
            if(!response.ok){
                throw new Error("Pokémon Não encontrado!")
            }

            const data = await response.json();

            pokedex.innerHTML = "";
            erroMessage.textContent = "";

            createCard(data)
    }
    catch(error){
        console.error(error);
        erroMessage.textContent = "Pokémon não encontrado";
    }        
})

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createCard(data){

    //criando elementos

    //card pokemon

    const itemPokedex = document.createElement("div");
    itemPokedex.classList.add("item-pokedex");

    //imagem/gif do pokemon

    const imgPokemon = data.sprites.front_default;
    const gifPokemon = data.sprites.other.showdown.front_default;

    const spritePokemon = document.createElement("img");
    spritePokemon.src = imgPokemon;
    spritePokemon.alt = "sprite-pokemon";
    spritePokemon.classList.add("sprite-pokemon");

    if(gifPokemon){

        spritePokemon.addEventListener("mouseover", ()=>{
            spritePokemon.src = data.sprites.other.showdown.front_default;
        })

        spritePokemon.addEventListener("mouseout", ()=>{
            spritePokemon.src = data.sprites.front_default;
        })
    }

    //id do pokemon

    const idPokemon = document.createElement("p");
    idPokemon.textContent = `# ${data.id}`;
    idPokemon.classList.add("id-pokemon");

    //nome do pokemon

    const namePokemon = document.createElement("p");
    namePokemon.textContent = capitalize(data.name);
    namePokemon.classList.add("name-pokemon");

    // div dos tipos

    const types = document.createElement("div");
    types.classList.add("types")

    //tipo do pokemon

    const type1 = document.createElement("p");
    type1.textContent = capitalize(data.types[0].type.name);
    type1.classList.add("type-1");

    types.appendChild(type1)

    if(data.types[1]){
        const labelBarra =  document.createElement("label");
        labelBarra.textContent = " | ";
        types.appendChild(labelBarra);

        const type2 = document.createElement("p");
        type2.textContent = capitalize(data.types[1].type.name);
        type2.classList.add("type-2");
        types.appendChild(type2)
    }

    //montando o card

    backgroundColorCard(data.types[0].type.name, itemPokedex)

    itemPokedex.appendChild(spritePokemon)
    itemPokedex.appendChild(idPokemon)
    itemPokedex.appendChild(namePokemon)
    itemPokedex.appendChild(types)

    pokedex.appendChild(itemPokedex)
}

async function fetchPokemon(){

    try{
        for(let i = 1; i <= 151; i++){

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        
            if(!response.ok){
                throw new Error("Pokémon Não encontrado!")
            }

            const data = await response.json();
            
            erroMessage.textContent = "";

            createCard(data)
        }

    }
    catch(error){
        console.error(error);
    }
}

fetchPokemon();

// alterar a cor do card conforme o primeiro tipo

function backgroundColorCard(type, itemPokedex){

    switch(type){
        case "normal":
            itemPokedex.style.backgroundColor = "#A8A878";
            break;

        case "fire":
            itemPokedex.style.backgroundColor = "#FF7F0F";
            break;
  
        case "electric":
            itemPokedex.style.backgroundColor = "#F7D02C";
            break;
        
        case "grass":
            itemPokedex.style.backgroundColor = "#7AC74C";
            break;
            
        case "water":
            itemPokedex.style.backgroundColor = "#6890F0";
            break;
        
        case "ice":
            itemPokedex.style.backgroundColor = "#96D9D6";
            break;

        case "fighting":
            itemPokedex.style.backgroundColor = "#C22E28";
            break;
            
        case "poison":
            itemPokedex.style.backgroundColor = "#A33EA1";
            break;
            
        case "ground":
            itemPokedex.style.backgroundColor = "#E2BF65";
            break;
        
        case "flying":
            itemPokedex.style.backgroundColor = "#A98FF3";
            break;
            
        case "psychic":
            itemPokedex.style.backgroundColor = "#F95587";
            break;

        case "bug":
            itemPokedex.style.backgroundColor = "#A6B91A";
            break;

        case "rock":
            itemPokedex.style.backgroundColor = "#B6A136";
            break;
            
        case "ghost":
            itemPokedex.style.backgroundColor = "#735797";
            break;
            
        case "dragon":
            itemPokedex.style.backgroundColor = "#6F35FC";
            break;
        
        case "dark":
            itemPokedex.style.backgroundColor = "#705746";
            break;
            
        case "steel":
            itemPokedex.style.backgroundColor = "#B7B7CE";
            break;
        
        case "fairy":
            itemPokedex.style.backgroundColor = "#D685AD";
            break;
        default:
            itemPokedex.style.backgroundColor = "#000";
    }
}