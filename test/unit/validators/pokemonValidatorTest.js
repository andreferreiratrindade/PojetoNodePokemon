const PokemonValidation = require('../../../src/validators/pokemonValidator');

describe('Validators: Pokemon', () => {
    describe('Tipos de pokemons válidos: temTipoValido', () => {
        it('Deve validar tipo de pokemon', () => {

            const pokemonValidator = new PokemonValidation();

            pokemonValidator.temTipoValido("mewtwo");

            pokemonValidator.isValid();
            expect(pokemonValidator.isValid()).to.be.eql(true);

        });

        it('Deve recusar tipo', () => {

            const pokemonValidator = new PokemonValidation();

            pokemonValidator.temTipoValido("qwerter");

            pokemonValidator.isValid();
            expect(pokemonValidator.isValid()).to.be.eql(false);

        });

        it('Deve recusar tipo igual NULL', () => {

            const pokemonValidator = new PokemonValidation();

            pokemonValidator.temTipoValido();

            pokemonValidator.isValid();
            expect(pokemonValidator.isValid()).to.be.eql(false);

        });
    });
});