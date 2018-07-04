'use strict';

var express = require('express')
    , router = express.Router()
module.exports = (app) => {

    let batalhaController = app.src.controllers.batalhaController;
   
   /**
     * @api {post} /batalhar/:pokemonAId/:pokemonBId Executa batalha
     * @apiGroup Batalha
     * @apiParam {Number} pokemonAId Id do pokemonA; Campo obrigatório
     * @apiParam {Number} pokemonBId Id do pokemonB; Campo obrigatório
     * @apiParamExample {json} Entrada
     *       /batalhar/1/2
     * @apiSuccess {Object} vencedor pokemon vencedor; subiu de nível  
     * @apiSuccess {Object} perdedor pokemon vencedor; caiu de nível  
     * @apiSuccessExample {json} Sucesso
     * 200 OK
     *  {  vencedor:{
     *       id: 1, tipo: "tipo", treinador:"treinador", nivel:2 // Subiu de nível
     *     },
     *     perdedor: {
     *      id: 1, tipo: "tipo", treinador:"treinador", nivel:0 // Será eliminado do banco de dados, pois nível é igual à zero.
     *     }
     *  
     */
    router.post('/:pokemonAId/:pokemonBId', batalhaController.batalhar);

    app.use("/batalhar", router);
};

