'use strict';

var express = require('express')
    , router = express.Router()

module.exports = (app) => {

    let pokemonController = app.src.controllers.pokemonController;

    /**
     * @api {post} /pokemons Criar pokemon
     * @apiGroup Pokemons
     * @apiParam {String(50)} tipo Tipo do pokemon; Campo obrigatório; Tipos aceitos: "charizard", "mewtwo" ou "pikachu"; máximo 50 caracteres
     * @apiParam {String(50)} treinador Treinador do pokemon; Campo obrigatório; máximo 50 caracteres; Tipos aceitos: "charizard", "mewtwo" ou "pikachu"
     * @apiParamExample {json} Entrada
     *    { "tipo": "tipo","treinador":"treinador" }
     * @apiSuccess {Number} id id do pokemon criado
     * @apiSuccess {String} tipo tipo do pokemon
     * @apiSuccess {String} treinador treinador do pokemon
     * @apiSuccess {Number} nivel nível do pokemon
     * @apiSuccessExample {json} Sucesso
     * 200 OK
     *  {id: 1 , tipo: "tipo", treinador:"treinador", nivel:1 }
     */
    router.post('/', pokemonController.criar);
    /**
    * @api {put} /pokemons/id Alterar pokemon
    * @apiGroup Pokemons
    * @apiParam {Number} id Id do pokemon que será alterado; Inserir Id na url; Campo obrigatório
    * @apiParamExample {Number} Entrada-Url
    *    /pokemons/1
    * @apiParam {String} treinador Treinador do pokemon; Campo obrigatório
    * @apiParamExample {json} Entrada-Json
    *    { treinador":"treinador" }
    * @apiSuccessExample {json} Sucesso
    *  204 No_Content
    */
    router.put('/:id', pokemonController.alterar);
    /**
     * @api {delete} /pokemons/id Deletar pokemon
     * @apiGroup Pokemons
    * @apiParam {Number} id id do pokemon a ser deletado
     * @apiParamExample {Number} Entrada
     *    /pokemons/1
     * @apiSuccessExample {json} Sucesso
     * 204 No_Content
     */
    router.delete('/:id', pokemonController.deletar);
    /**
    * @api {get} /pokemons Listar pokemons
    * @apiGroup Pokemons
    * @apiSuccess {Object[]} pokemons Lista de pokemons
    * @apiSuccessExample {json} Sucesso
    * 200 OK
    * [{  id: 1,  tipo: "pikachu", treinador: "Thiago", nivel: 1  }
    * , { id: 2, tipo: "charizard",treinador: "Renato", nivel: 1  }]
    */
    router.get('/', pokemonController.listar);
    /**
    * @api {get} /pokemons/id Carregar pokemon
    * @apiGroup Pokemons
    * @apiParam {Number} id id do pokemon a ser carregado; Campo obrigatório
    * * @apiParamExample {Number} Entrada
    *    /pokemons/InserirAqui
    * @apiSuccess {Number} id id do pokemon recuperado
    * @apiSuccess {String} tipo tipo do pokemon recuperado
    * @apiSuccess {String} treinador Treinador do pokemon recuperado
    * @apiSuccess {Number} nivel nível do pokemon recuperado
    
    * @apiSuccessExample {json} Sucesso
    * 200 OK 
    *{    id: 1,    tipo: "pikachu", treinador: "Thiago",    nivel: 1  }
    */
    router.get('/:id', pokemonController.carregar);

    app.use("/pokemons", router);

};

