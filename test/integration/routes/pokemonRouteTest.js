const httpStatus = require('http-status');
const pokemonFactory = require('../factory/pokemonFactory');
describe('Pokemons', () => {


    describe('Pokemons / Get ', () => {

        it('Deverá recuperar pokemons', (done) => {
            request
                .get('/pokemons')
                .send()
                .expect(httpStatus.OK)
                .end((err, res) => {
                    done(err);
                });
        });
    });

    describe('Pokemons / Get ', () => {

        it('Deverá recuperar apenas 1 pokemon', (done) => {

            let novoPokemon = {
                tipo: "mewtwo",
                treinador: "asdasdas sdadasdasda dasdas"
            };

            pokemonFactory.adicionaPokemon(novoPokemon, (retorno) => {

                request
                    .get(`/pokemons/${retorno.id}`)
                    .send()
                    .expect(httpStatus.OK)
                    .end((err, res) => {
                        expect(res.body.id).to.eql(retorno.id);
                        expect(res.body.tipo).to.eql(retorno.tipo);
                        expect(res.body.treinador).to.eql(retorno.treinador);

                        pokemonFactory.deletaPokemon(retorno.id, (retorno) => {

                            done(err);
                        })
                    });
            });
        });
    });
    describe('Pokemons / Put ', () => {
        it('Deve alterar pokemon', (done) => {
            let novoPokemon = {
                treinador: "andre",
                tipo: "mewtwo"
            };
            pokemonFactory.adicionaPokemon(novoPokemon, (retorno) => {

                let alteraPokemon = {
                    treinador: "tais"
                };

                request
                    .put(`/pokemons/${retorno.id}`)
                    .send(alteraPokemon)
                    .expect(httpStatus.NO_CONTENT)
                    .end((err, res) => {

                        pokemonFactory.recuperaPokemon(retorno.id, (retorno) => {
                            expect(retorno.treinador).to.eql(alteraPokemon.treinador);
                            pokemonFactory.deletaPokemon(retorno.id, (retorno) => {

                                done(err);
                            });
                        });
                    });
            });
        });
    });

    describe('Pokemons / Post ', () => {

        it('Deve adicionar pokemon', (done) => {

            let novoPokemon = {
                tipo: "mewtwo",
                treinador: "asdasdas sdadasdasda dasdasdasd dsadsadsad dsad"
            };

            request
                .post('/pokemons')
                .send(novoPokemon)
                .expect(httpStatus.OK)
                .end((err, res) => {
                    expect(res.body.tipo).to.eql(novoPokemon.tipo);
                    expect(res.body.treinador).to.eql(novoPokemon.treinador);
                    pokemonFactory.deletaPokemon(res.body.id, (retorno) => {

                        done(err);
                    })
                });
        });

        it('Deve bloquear ao adicionar pokemon com tipo inválido', (done) => {

            let novoPokemon = {
                tipo: "invalido",
                treinador: "asdasdas sdadasdasda dasdasdasd dsadsadsad dsad"
            };

            request
                .post('/pokemons')
                .send(novoPokemon)
                .expect(httpStatus.BAD_REQUEST)
                .end((err, res) => {

                    done();
                });
        });
    });

    describe('Pokemons / Delete ', () => {

        it('Deve remover pokemon', (done) => {
            // Adiciona pokemon, recuperar o id e realizar funcionalidade de deletar
            let novoPokemon = {
                tipo: "mewtwo",
                treinador: "asdasdas sdadasdasda dasd"
            };
            pokemonFactory.adicionaPokemon(novoPokemon, (retorno) => {
                request
                    .delete(`/pokemons/${retorno.id}`)
                    .send()
                    .expect(httpStatus.NO_CONTENT)
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(httpStatus.NO_CONTENT);
                        pokemonFactory.recuperaPokemon(retorno.id, (retorno) => {
                            done(err);
                        })
                    });
            });
        });
    });
});

