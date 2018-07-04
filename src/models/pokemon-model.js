'use strict';


module.exports = (sequelize, DataTypes) => {
    var Pokemons = sequelize.define(
        'pokemonModel',
        {

            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

            tipo: {
                type: DataTypes.STRING(50), allowNull: false, validate: {
                    notEmpty: true
                }
            },

            treinador: {
                type: DataTypes.STRING(50), allowNull: false, validate: {
                    notEmpty: true
                }
            },

            nivel: { type: DataTypes.INTEGER, allowNull: false },
        }, {
            timestamps: false,
            freezeTableName: true,
            tableName: 'pokemons',
        }
    );
    return Pokemons;
};