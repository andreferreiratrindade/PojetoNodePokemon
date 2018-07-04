const batalhaDomain = require('../../../src/domains/batalhaDomain');


describe('Domains: Batalha', () => {

    criaPokemonRepositoryMock = () => {

        return {
            src: {
                repositories: {
                    pokemonRepository: {
                        get: td.function(),
                        update: td.function(),
                        deleteQuery: td.function()
                    }
                }
            }
        };
    }

    describe('Recupera força de ataquie: recuperaForcaDeAtaque', () => {
        it('Deve retornar tamanho da força de ataque', () => {

            const repository = criaPokemonRepositoryMock();

            let domain = batalhaDomain(repository);
            let valorMaximo = 10;
            let retorno = 0;

            // Verifica 50 vezes o número aleatório
            for (let i = 0; i < 50; i++) {
                retorno = domain.recuperaForcaDeAtaque(valorMaximo);
                expect(retorno <= valorMaximo).to.be.eql(true);
            }
        });
    });

    describe('Realizando ataques: realizandoAtaques', () => {
        it('Deve realizar ataques', () => {
            const repository = criaPokemonRepositoryMock();


            let atacante = { range: 16 };

            let defesa = { vida: 100 };

            const numAleatorio = 10;
            let domain = batalhaDomain(repository, numAleatorio);
            domain.realizandoAtaques(atacante, defesa);
            expect(defesa.vida).to.be.eql(84);

            domain.realizandoAtaques(atacante, defesa);
            expect(defesa.vida).to.be.eql(68);

            domain.realizandoAtaques(atacante, defesa);
            expect(defesa.vida).to.be.eql(52);
        });
    });


    describe('Calcula força de vantagem: calculaForcaDeVantagem', () => {
        it('Deve realizar calculo de força de vantagem', () => {

            const repository = criaPokemonRepositoryMock();

            let domain = batalhaDomain(repository);
            let forca = domain.calculaForcaDeVantagem(2, .66);
            expect(forca).to.be.eql(3.0303030303030303);
        });
    });

    describe('Preparando pokemons para batalha: preparaPokemonsParaBatalha', () => {
        it('Deve preparar pokemons com níveis diferentes', () => {

            const repository = criaPokemonRepositoryMock();
            let pokemons = [{
                id: 1,
                nivel: 1
            }, {
                id: 1,
                nivel: 2
            }]

            const numAleatorio = 10;
            let domain = batalhaDomain(repository);
            let batalhaPoco = domain.preparaPokemonsParaBatalha(pokemons);
            expect(batalhaPoco.pokemonA.range).to.be.eql(10);
            expect(batalhaPoco.pokemonB.range).to.be.eql(15.15151515151515);


            pokemons = [{
                id: 1,
                nivel: 3
            }, {
                id: 1,
                nivel: 2
            }]

            batalhaPoco = domain.preparaPokemonsParaBatalha(pokemons);
            expect(batalhaPoco.pokemonB.range).to.be.eql(10);
            expect(batalhaPoco.pokemonA.range).to.be.eql(15.15151515151515);

        });

        it('Deve preparar pokemons com níveis iguais', () => {

            const repository = criaPokemonRepositoryMock();
            let pokemons = [{
                id: 1,
                nivel: 1
            }, {
                id: 1,
                nivel: 1
            }]

            const numAleatorio = 10;
            let domain = batalhaDomain(repository);
            let batalhaPoco = domain.preparaPokemonsParaBatalha(pokemons);
            expect(batalhaPoco.pokemonA.range).to.be.eql(10);
            expect(batalhaPoco.pokemonB.range).to.be.eql(10);

        });
    });

    describe('Copoe Resultado final da batalha: compoeResultadoFinalDaBatalha', () => {
        it('Deve compor resultado final da batalha - Vencedor: Pokemon B', () => {
            const repository = criaPokemonRepositoryMock();

            let batalhaComPokemon = {
                vencedor: {},
                perdedor: {},
                pokemonA: {
                    pokemon: {
                        id: 1,
                        nivel: 3
                    },
                    vida: 0
                },
                pokemonB: {
                    pokemon: {
                        id: 2,
                        nivel: 4
                    },

                    vida: 15
                }
            };

            let domain = batalhaDomain(repository);
            let resultado = domain.compoeResultadoFinalDaBatalha(batalhaComPokemon);
            expect(resultado.vencedor.id).to.be.eql(2);
            expect(resultado.perdedor.id).to.be.eql(1);
            expect(resultado.perdedor.nivel).to.be.eql(2);
            expect(resultado.vencedor.nivel).to.be.eql(5);


        });

        it('Deve compor resultado final da batalha - Vencedor: Pokemon A', () => {
            const repository = criaPokemonRepositoryMock();

            let batalhaComPokemon = {
                vencedor: {},
                perdedor: {},
                pokemonA: {
                    pokemon: {
                        id: 1,
                        nivel: 3
                    },
                    vida: 35
                },
                pokemonB: {
                    pokemon: {
                        id: 2,
                        nivel: 4
                    },
                    vida: 0
                }
            };

            let domain = batalhaDomain(repository);
            let resultado = domain.compoeResultadoFinalDaBatalha(batalhaComPokemon);
            expect(resultado.vencedor.id).to.be.eql(1);
            expect(resultado.perdedor.id).to.be.eql(2);
            expect(resultado.perdedor.nivel).to.be.eql(3);
            expect(resultado.vencedor.nivel).to.be.eql(4);


        });

        it('Deve compor resultado final da batalha - Com vida negativa - Vencedor: Pokemon A', () => {
            const repository = criaPokemonRepositoryMock();

            let batalhaComPokemon = {
                vencedor: {},
                perdedor: {},
                pokemonA: {
                    pokemon: {
                        id: 1,
                        nivel: 3
                    },
                    vida: 35,
                },
                pokemonB: {
                    pokemon: {
                        id: 2,
                        nivel: 4
                    },
                    vida: -10
                }
            };

            let domain = batalhaDomain(repository);
            let resultado = domain.compoeResultadoFinalDaBatalha(batalhaComPokemon);
            expect(resultado.vencedor.id).to.be.eql(1);
            expect(resultado.perdedor.id).to.be.eql(2);
            expect(resultado.perdedor.nivel).to.be.eql(3);
            expect(resultado.vencedor.nivel).to.be.eql(4);


        });
    });

    describe('Executa batalha: executaBatalha', () => {
        it('Deve executar balhar - Vencedor: pokemon B Id: 1', () => {

            const repository = criaPokemonRepositoryMock();

            let batalhaComPokemon = {
                pokemonA: {
                    id: 1,
                    vida: 10,
                    range: 2,
                    nivel: 1
                },
                pokemonB: {
                    id: 2,
                    vida: 100,
                    range: 3,
                    nivel: 15
                }
            };

            let domain = batalhaDomain(repository);
            let result = domain.executaBatalha(batalhaComPokemon)
            expect(result.pokemonA.vida <= 0).to.be.eql(true);
            expect(result.pokemonB.vida > 0).to.be.eql(true);

        });

        it('Deve executar balhar - Vencedor: pokemon A Id: 2', () => {

            const repository = criaPokemonRepositoryMock();

            let batalhaComPokemon = {
                pokemonA: {
                    id: 1,
                    vida: 40,
                    range: 16,
                    nivel: 2
                },
                pokemonB: {
                    id: 2,
                    vida: 20,
                    range: 1,
                    nivel: 1
                }
            };

            let domain = batalhaDomain(repository);
            let result = domain.executaBatalha(batalhaComPokemon)
            expect(result.pokemonB.vida <= 0).to.be.eql(true);
            expect(result.pokemonA.vida > 0).to.be.eql(true);

        });
    });


    describe('Batalhar: batalhar', () => {
        it('Deve iniciar uma batalha entre pokemons: vencedor : PokemonA', () => {
            const repository = criaPokemonRepositoryMock();

            let expectedResponse = [{ id: 1, tipo: 'pokemon_1', treinador: 'André', nivel: 2 },
            { id: 21, tipo: 'pokemon_2', treinador: 'Taís', nivel: 1 }];

            let pokemonAId = 1;
            let pokemonBId = 2;

            let query = {
                where: {
                    id: [pokemonAId, pokemonBId]
                }
            };

            td.when(repository.src.repositories.pokemonRepository.get(query))
                .thenReturn(expectedResponse);

            let vencedor = { nivel: 3, id: 1 };
            let perdedor = { nivel: 0, id: 2 };

            td.when(repository.src.repositories.pokemonRepository.update(vencedor))
                .thenReturn(() => { });

            td.when(repository.src.repositories.pokemonRepository.update(perdedor))
                .thenReturn(() => { });
            let queryDelete = { nivel: 0 };

            td.when(repository.src.repositories.pokemonRepository.deleteQuery(perdedor))
                .thenReturn(() => { });


            let obj = { pokemonAId: 1, pokemonBId: 2 };

            let domain = batalhaDomain(repository, 10);
            return domain.batalhar(obj).then(result => {

                expect(result.dados.vencedor.nivel).to.be.eql(3);
                expect(result.dados.perdedor.nivel).to.be.eql(0);
                
            });
        });

    });
});
