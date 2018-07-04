'use strict';
const httpStatus = require('http-status');

module.exports = (app) => {

    const pokemonDomain = app.src.domains.pokemonDomain;

    // Criar novo pokemon
    this.criar = async (req, res, next) => {

        try {
            let data = await pokemonDomain.adicionaNovoPokemon(req.body);

            let status = httpStatus.OK;

            if (!data.status)
                status = httpStatus.BAD_REQUEST;

            res.status(status).json(data.dados);
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message
            });
        };

    };

    // Alterar pokemon
    // Somente permitir alterar o campo "treinador"
    this.alterar = async (req, res, next) => {

        try {
            let obj = {
                id: req.params.id,
                treinador: req.body.treinador
            };

            let data = await pokemonDomain.alterarTreinador(obj);

            let status = httpStatus.NO_CONTENT;

            if (!data.status)
                status = httpStatus.BAD_REQUEST;

            res.sendStatus(status);
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message
            });
        };
    };

    // Remove pokemon
    // Exclusão logica?
    this.deletar = async (req, res, next) => {

        try {


            let data = await pokemonDomain.deletar(req.params.id);

            let status = httpStatus.NO_CONTENT;

            if (!data.status)
                status = httpStatus.BAD_REQUEST;

            res.sendStatus(status);
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message
            });
        };
    };


    // Recupera lista de todos os pokemons.
    this.listar = async (req, res, next) => {
        try {

            let data = await pokemonDomain.listar(req.body);

            let status = httpStatus.OK;

            if (!data.status)
                status = httpStatus.BAD_REQUEST;
            res.status(status).json(data.dados);
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message
            });
        };
    };


    // Recupera pokemon por id
    this.carregar = async (req, res, next) => {

        try {
            let data = await pokemonDomain.carregar(req.params.id);

            let status = httpStatus.OK;

            if (!data.status)
                status = httpStatus.BAD_REQUEST;

                res.status(status).json(data.dados);
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message
            });
        };
    };
    
    return this;
}

