'use strict';
const httpStatus = require('http-status');


module.exports = (app) => {

    const batalhaDomain = app.src.domains.batalhaDomain;

    this.batalhar = async (req, res, next) => {
        try {

            let data = await batalhaDomain.batalhar(req.params);

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

