const { 
    listarPokemons,
    detalharPokemon
} = require('utils-playground');

const buscarPaginaPokemons = async (req, res) => {
    const pokes = await listarPokemons(0);
    res.json(pokes.results);    
};

const buscarPokemonId = async (req, res) => {
    const id = req.params.id;
    let poke;

    typeof id === 1 ?
    poke = await detalharPokemon(Number(id)) :
    poke = await detalharPokemon(id);

    const detalhesPokemon = {
        id: poke.id,
        name: poke.name,
        height: poke.height,
        weight: poke.weight,
        base_experience: poke.base_experience,
        forms: poke.forms,
        abilities: poke.abilities,
        species: poke.species
    };

    res.json(detalhesPokemon);
};

module.exports = {
    buscarPaginaPokemons,
    buscarPokemonId
};
