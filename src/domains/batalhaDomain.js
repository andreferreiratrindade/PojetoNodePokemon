const BatalhaValidator = require('../validators/batalhaValidator');
const PokemonBatalhaPoco = require('../pocos/pokemonBatalha-poco')
const BatalhaPoco = require('../pocos/batalha-poco')
const ReturnMessage = require("../lib/returnMessage");

// Possibilidade do pokemon com nivel maior de ganhar.
const CHANCE_GANHAR_MELHOR_NIVEL = 0.66;
const TAMANHO_RANGE = 10;
const TAMANHO_VIDA = 100;

module.exports = (app, numAleatorio) => {

    const validator = new BatalhaValidator();
    const pokemonRepository = app.src.repositories.pokemonRepository;
    const numeroAleatorio = numAleatorio;

    this.batalhar = async (obj) => {
        let retorno = new ReturnMessage();

        validator.clear();

        // Campos obrigatórios
        validator.isRequired(obj.pokemonAId, "pokemonAId");
        validator.isRequired(obj.pokemonBId, "pokemonBId");

        // Verifica se os pokemons que vão batalhar são os mesmos
        validator.temPokemonDiferente(obj.pokemonAId, obj.pokemonBId);

        // Caso os dados forem inválidos
        if (!validator.isValid()) {
            retorno.adicionaDados(false, validator.errors);
        } else {

            let pokemonsLst = await this.recuperaPokemonsParaBatalha(obj.pokemonAId, obj.pokemonBId);

          // if (pokemonsLst.length < 2) {
          //     let pokemonsNaoEncontrados = pokemonsLst.filter(x => { return x !== obj.pokemonAId || x !== obj.pokemonBId });
          //     retorno.adicionaDados(false, `Pokemon não encontrado: Id - ${pokemonsNaoEncontrados.map(x=>x.id).join()}` );
          //     return retorno;
          // }
            
            let batalhaComPokemons = this.preparaPokemonsParaBatalha(pokemonsLst);;

            batalhaComPokemons = this.executaBatalha(batalhaComPokemons);

            batalhaComPokemons = this.compoeResultadoFinalDaBatalha(batalhaComPokemons);
            // Atualiza pontuação de pokemons
            await this.atualizaPontuacaoPokemons(batalhaComPokemons.vencedor, batalhaComPokemons.perdedor);

            // Remove pokemons com nivel igual à 0
            await this.deletaPokemonsComNivelIgualZero();

            let resultado = this.parseObjVencedorAndPerdedor(batalhaComPokemons);
            retorno.adicionaDados(true, resultado);
        }

        return retorno;
    };

    this.parseObjVencedorAndPerdedor = (batalhaComPokemons) => {
        return { vencedor: batalhaComPokemons.vencedor, perdedor: batalhaComPokemons.perdedor };
    }

    this.deletaPokemonsComNivelIgualZero = async () => {

        await pokemonRepository.deleteQuery({ nivel: 0 });
    }

    // Atualiza pontuação de pokemons após a bastalha
    this.atualizaPontuacaoPokemons = async (vencedor, perdedor) => {

        // Atualiza vencedor
        await pokemonRepository.update({ nivel: vencedor.nivel, id: vencedor.id });
        await pokemonRepository.update({ nivel: perdedor.nivel, id: perdedor.id });

    };

    // Recupera pokemons no banco de dados para realização da batalha
    this.recuperaPokemonsParaBatalha = async (pokemonAId, pokemonBId) => {

        let pokemons = await pokemonRepository.get(
            {
                where: {
                    id: [pokemonAId, pokemonBId]
                }
            });
        return pokemons;
    };

    // Executa batalha
    this.executaBatalha = (batalhaComPokemons) => {

        let acabou = false;
        while (!acabou) {

            this.realizandoAtaques(batalhaComPokemons.pokemonA, batalhaComPokemons.pokemonB);

            this.realizandoAtaques(batalhaComPokemons.pokemonB, batalhaComPokemons.pokemonA);
            acabou = !(batalhaComPokemons.pokemonA.vida > 0 && batalhaComPokemons.pokemonB.vida > 0);
        }

        return batalhaComPokemons;
    };

    // Separa pokemon vencedor do perdedor
    // atualiza nivel do pokemon
    this.compoeResultadoFinalDaBatalha = (batalhaComPokemons) => {


        batalhaComPokemons.vencedor = batalhaComPokemons.pokemonA.vida <= 0 ? batalhaComPokemons.pokemonB.pokemon : batalhaComPokemons.pokemonA.pokemon;
        batalhaComPokemons.perdedor = batalhaComPokemons.pokemonA.vida > 0 ? batalhaComPokemons.pokemonB.pokemon : batalhaComPokemons.pokemonA.pokemon;

        batalhaComPokemons.vencedor.nivel += 1;
        batalhaComPokemons.perdedor.nivel -= 1;


        return batalhaComPokemons;
    };

    // Realiza ataques entre os pokemons.
    // Neste caso, realiza um ataque por vez.
    this.realizandoAtaques = (atacante, defesa) => {

        atacante.ataque = this.recuperaForcaDeAtaque(atacante.range);
        defesa.vida -= atacante.ataque;

    };

    // Realiza calculo de força de ataque, baseado no valor máximo de ataque do pokemon
    this.recuperaForcaDeAtaque = (max) => {

        let value = this.recuperaNumeroAleatorio() * max;

        return value > max ? max : value;
    };

    this.recuperaNumeroAleatorio = () => {
        return numeroAleatorio || Math.random();
    }

    // Prepara pokeons baseado no nivel deles.
    this.preparaPokemonsParaBatalha = (pokemons) => {

        let pokemonA = new PokemonBatalhaPoco(TAMANHO_RANGE, TAMANHO_VIDA);
        pokemonA.pokemon = pokemons[0];

        let pokemonB = new PokemonBatalhaPoco(TAMANHO_RANGE, TAMANHO_VIDA);
        pokemonB.pokemon = pokemons[1];

        if (pokemonA.pokemon.nivel > pokemonB.pokemon.nivel) {
            pokemonA.range = this.calculaForcaDeVantagem(pokemonA.range, CHANCE_GANHAR_MELHOR_NIVEL);
        } else if (pokemonA.pokemon.nivel < pokemonB.pokemon.nivel) {
            pokemonB.range = this.calculaForcaDeVantagem(pokemonB.range, CHANCE_GANHAR_MELHOR_NIVEL);
        }

        return new BatalhaPoco(pokemonA, pokemonB);

    };

    this.calculaForcaDeVantagem = (range, porcentagem) => {

        return range / porcentagem;
    }

    return this;
};