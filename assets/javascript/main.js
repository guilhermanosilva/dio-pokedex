const pokeList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

let offset = 0;
let limit = 4;
let maxLimit = 151; // Limt for first generation of pokemons

function loadPokemonItems(offset, limit) {
  function convertPokemonToLi(pokemon) {
    return `
      <li class="pokemon">
        <div class="pokeContent ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="pokeDetails">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}"/>
          </div>
        </div>

        <ul class="pokeStats">
          <h4>Stats</h4>

          ${pokemon.stats
            .map(
              (stat) => `
                <li>
                  <span>${getStatFormatedName(stat.stat.name)}</span>
                  <span class="pokeStat-baseStat">${stat.base_stat}</span>
                  <div class="progressStatContainer">
                    <div 
                      class="progressStat 
                        ${stat.base_stat >= 50 ? "grass" : "psychic"}
                        ${stat.base_stat >= 100 ? "fullStat" : ""}
                      "
                      style="width:${
                        stat.base_stat >= 100 ? 100 : stat.base_stat
                      }%"
                    ></div>
                  </div>
                </li>
              `
            )
            .join("")}
        </ul>
      </li>
    `;
  }

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokeList.innerHTML += pokemons.map(convertPokemonToLi).join("");

    handlePokeClick();
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxLimit) {
    const newLimit = maxLimit - offset;
    loadPokemonItems(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

function getStatFormatedName(statName) {
  switch (statName.trim()) {
    case "hp":
      return "HP";
    case "special-attack":
      return "SP";
    case "special-defense":
      return "SD";
    default:
      return statName;
  }
}
