'use strict';

const FluentValidator = require('./fluentValidator')

class BatalhaValidator extends FluentValidator {


    temPokemonDiferente(pokemonA, pokemonB) {

        if (pokemonA == pokemonB )
           this.addMessageError("Favor batalhar com Ids diferentes.");
    }

}

module.exports = BatalhaValidator