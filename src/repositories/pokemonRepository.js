'use strict';

module.exports = (app) => {

    let pokemonModel = app.libs.db.models.pokemonModel;

    // // Recupera todos os pokemons
    this.get = async (where) => {

        let res = await pokemonModel.findAll(where);
        return res;
    }

    // Recupera por id
    this.getById = async (id) => {
        let res = await pokemonModel.findOne({ where: { id: id } });

        return res;
    }

    this.create = async (data) => {
        let res = await pokemonModel.create(data);
        return res;
    }

    this.update = async (data) => {

        await pokemonModel.update(data, { where: { id: data.id } });
    }

    this.delete = async (id) => {
        await pokemonModel.destroy({ where: { id: id } });
    }

    this.deleteQuery = async (where) => {
        await pokemonModel.destroy({ where: where });
    }

    return this;
}
