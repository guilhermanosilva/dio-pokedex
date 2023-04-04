const pokeApi = {};

function convertPokeApiDetailToPokemon(detail) {
  const pokemon = new Pokemon();
  const types = detail.types.map((typesSlot) => typesSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.number = detail.id;
  pokemon.name = detail.name;
  pokemon.photo = detail.sprites.other.dream_world.front_default;
  pokemon.stats = detail.stats;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) =>
  fetch(pokemon.url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .then(convertPokeApiDetailToPokemon);

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => {
      console.log(pokemonsDetails);
      return pokemonsDetails;
    })
    .catch((err) => console.error(err));
};
