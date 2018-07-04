const httpStatus = require('http-status');
const pokemonFactory = require('../factory/pokemonFactory');

describe('Batalhar', () => {
    describe('/batalhar/:pokemonAId/:pokemonBId', () => {

        it('Executa batalha', (done) => {

            let pokemonA = {
                tipo: "mewtwo",
                treinador: "André"
            };

            let pokemonB = {
                tipo: "pikachu",
                treinador: "Taís"
            };

            pokemonFactory.adicionaPokemon(pokemonA, (retorno) => {
                pokemonA = retorno;

                pokemonFactory.adicionaPokemon(pokemonB, (retornoB) => {
                    pokemonB = retornoB;

                    request
                        .post(`/batalhar/${pokemonA.id}/${pokemonB.id}`)
                        .expect(httpStatus.OK)
                        .end((err, res) => {
                            done(err);
                        });
                });
            });
        });

        it('Erro ao executar batalha: pokemon não encontrado', (done) => {

            request
                .post(`/batalhar/1/99999`)
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .end((err, res) => {
                    done(err);
                });
        });
    });
});

