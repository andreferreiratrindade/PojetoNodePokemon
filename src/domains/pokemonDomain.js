'use strict';

 const PokemonValidator = require('../validators/pokemonValidator');
const ReturnMessage = require("../lib/returnMessage");

module.exports = (app) => {

  let pokemonRepository = app.src.repositories.pokemonRepository
  let validator = new PokemonValidator();

  // Pokemon não poderá ter tipo diferente de "charizard"; "mewtwo" ; "pikachu"
  // Todos os pokemons inseridos iniciam com "nivel" = 1 
  this.adicionaNovoPokemon = async (obj) => {
    let retorno = new ReturnMessage();
    // let validator = new PokemonValidator();
    validator.clear();

    // Campo obrigatório - Tipo
    validator.isRequired(obj.tipo, "'tipo'");

    // Campo Obrigatório - Treinador
    validator.isRequired(obj.treinador, "'treinador'");
    validator.hasMaxLen(obj.treinador, 50, "'treinador'");


    //Tipos válidos:  "charizard"; "mewtwo" ; "pikachu"
    validator.temTipoValido(obj.tipo);
        
    // Caso os dados forem inválidos
    if (!validator.isValid()) {
      retorno.adicionaDados(false, validator.errors);
    } else {
      obj.nivel = 1; // nivel deverá iniciar com 1
      const res = await pokemonRepository.create(obj);
      retorno.adicionaDados(true, res);
    }

    return retorno;
  };

  // Altera somente o treinador
  this.alterarTreinador = async (obj) => {

    let retorno = new ReturnMessage();
    // let validator = new PokemonValidator();
    validator.clear();
    // Campo Obrigatório - Treinador
    validator.isRequired(obj.treinador, "'treinador'");

    // Máximo de caracteres permitido = 50
    validator.hasMaxLen(obj.treinador, 50, "'treinador'");

    // Campo Obrigatório - Id
    validator.isRequired(obj.id, "'id'");

    // Id deverá ser maior que 0
    validator.hasMin(obj.id, 0, "'Id'");

    // Caso os dados forem inválidos
    if (!validator.isValid()) {
      retorno.adicionaDados(false, validator.errors);
    } else {

      let data = { treinador: obj.treinador, id: obj.id };

      await pokemonRepository.update(data);
      retorno.adicionaDados(true, null);
    }

    return retorno;
  };

  // Deleta pokemon
  this.deletar = async (id) => {

    let retorno = new ReturnMessage();
    // let validator = new PokemonValidator();
    validator.clear();

    // Campo Obrigatório - Id
    validator.isRequired(id, "'id'");

    // Id deverá ser maior que 0
    validator.hasMin(id, 0, "'Id'");

    // Caso os dados forem inválidos
    if (!validator.isValid()) {
      retorno.adicionaDados(false, validator.errors);
    } else {

      await pokemonRepository.delete(id);
      retorno.adicionaDados(true, null);
    }

    return retorno;
  };

  // Recupera todos os pokemons
  this.listar = async () => {
    let retorno = new ReturnMessage();

    let obj = await pokemonRepository.get();

    retorno.adicionaDados(true, obj);
    return retorno;
  };

  // Recupera apenas 1 pokemon
  this.carregar = async (id) => {
    let retorno = new ReturnMessage();
    // let validator = new PokemonValidator();
    validator.clear();

    // Campo Obrigatório - Id
    validator.isRequired(id, "'Id'");

    // Id deverá ser maior que 0
    validator.hasMin(id, 0, "'Id'");

    // Caso os dados forem inválidos
    if (!validator.isValid()) {
      retorno.adicionaDados(false, validator.errors);
    } else {
      let data = await pokemonRepository.getById(id);
      retorno.adicionaDados(true, data);
    }
    return retorno;
  };

  return this;
}