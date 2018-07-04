'use strict';

const FluentValidator = require('./fluentValidator')

class PokemonValidator extends FluentValidator {


    temTipoValido(value) {

        // Tipos válidos de pokemons
        let tiposValidos = ["charizard", "mewtwo", "pikachu"];

        if (!tiposValidos.includes(value))
           this.addMessageError(`Tipo  '${value}' não permitido. Tipos permitidos: ${tiposValidos}`);
    }

}

module.exports = PokemonValidator