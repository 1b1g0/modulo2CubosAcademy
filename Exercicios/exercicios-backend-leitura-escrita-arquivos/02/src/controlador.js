const { 
    listarPokemons,
    detalharPokemon
} = require('utils-playground');

const buscarPaginaPokemons = async (req, res) => {
    try {
        const pokes = await listarPokemons(0);
        return res.json(pokes.results);
    } 
    catch (erro) {
        return res.json(`Erro: ${erro.message}`)
    }
};

const buscarPokemonId = async (req, res) => {
    const id = req.params.id;
    let poke;

    try {
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
        return res.json(detalhesPokemon);

    } catch (erro) {
        return res.json(`Erro: ${erro.message}`)
    }
};

module.exports = {
    buscarPaginaPokemons,
    buscarPokemonId
};
