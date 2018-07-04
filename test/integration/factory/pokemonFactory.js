
const httpStatus = require('http-status');


exports.adicionaPokemon = (obj, next) => {

    request
        .post('/pokemons')
        .send(obj)
        .expect(httpStatus.OK)
        .end((err, res) => {

            next(res.body);
        });
}


exports.deletaPokemon = (id, next) => {
    request
        .delete(`/pokemons/${id}`)
        .send()
        .expect(httpStatus.NO_CONTENT)
        .end((err, res) => {
            next(res.body);
        });
}


exports.recuperaPokemon = (id, next) => {
    request
        .get(`/pokemons/${id}`)
        .send()
        .expect(httpStatus.OK)
        .end((err, res) => {

            next(res.body);
        });
}
