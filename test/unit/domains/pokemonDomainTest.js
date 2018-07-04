const pokemonDomain = require('../../../src/domains/pokemonDomain');


describe('Domains: Pokemon', () => {

    criaPokemonRepository = () => {

        return {
            src: {
                repositories: {
                    pokemonRepository: {
                        get: td.function(),
                        create: td.function(),

                    }
                }
            }
        };
    }

    describe('Recupera todos os pokemons: listar', () => {
        it('Deve retornar lista de pokemons', () => {
            const repository = criaPokemonRepository();

            const expectedResponse = [{
                id: 1,
                tipo: 'tipo1',
                treinador: 'treinador1',
                nivel: '1'
            }, {
                id: 2,
                tipo: 'tipo2',
                treinador: 'treinador2',
                nivel: '2'
            }
            ];

            td.when(repository.src.repositories.pokemonRepository.get())
                .thenResolve(expectedResponse);


            var domain = pokemonDomain(repository);

            return domain.listar()
                .then(response => {
                    expect(response.status).to.be.eql(true);
                    expect(response.dados).to.be.eql(expectedResponse);
                });
        });
    });

    describe('Adiciona pokemons: adicionaNovoPokemon', () => {
        it('Deve Adicionar 1 pokemon', () => {
            const repository = criaPokemonRepository();


            let obj = {
                tipo: 'charizard',
                treinador: 'treinador 1',
            };

            const expectedResponse = {
                id: 1,
                tipo: 'charizard',
                treinador: 'treinador 1',
                nivel: '1'
            };

            td.when(repository.src.repositories.pokemonRepository.create(obj))
                .thenResolve(expectedResponse);

            var domain = pokemonDomain(repository);

            return domain.adicionaNovoPokemon(obj)
                .then(response => {
                    expect(response.status).to.be.eql(true);
                    expect(response.dados).to.be.eql(expectedResponse);
                });
        });

        it('Deve bloquear pokemon com tipo inválido', () => {
            const repository = criaPokemonRepository();


            let obj = {
                tipo: 'teste',
                treinador: 'treinador 1',
            };

            const expectedResponse = {
                id: 1,
                tipo: 'charizard',
                treinador: 'treinador 1',
                nivel: '1'
            };

            td.when(repository.src.repositories.pokemonRepository.create(obj))
                .thenResolve(expectedResponse);

            var domain = pokemonDomain(repository);

            return domain.adicionaNovoPokemon(obj)
                .then(response => {
                    expect(response.status).to.be.eql(false);
                });
        });

        it('Deve bloquear pokemon com parametros incompletos', () => {
            const repository = criaPokemonRepository();

            let obj = {
                tipo: '',
                treinador: '',
            };

            const expectedResponse = {
                id: 1,
                tipo: 'charizard',
                treinador: 'treinador 1',
                nivel: '1'
            };

            td.when(repository.src.repositories.pokemonRepository.create(obj))
                .thenResolve(expectedResponse);

            var domain = pokemonDomain(repository);

            return domain.adicionaNovoPokemon(obj)
                .then(response => {
                    expect(response.status).to.be.eql(false);
                });
        });
    });
});