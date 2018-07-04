'use strict';
class FluentValidator {

    constructor() {
        this.errors = [];

    }

    addMessageError(message) {
        this.errors.push({ message: message });
    }

    isRequired(value, campo = "") {
        if (!value || value.length <= 0 )
            this.addMessageError(`${campo} - Campo obrigatório`);
    }

    hasMaxLen(value, max, campo = "") {
        if (!value || value.length > max)
            this.addMessageError(`${campo} - Deverá ter quantidade de caracteres menor ou igual ${max}`);
    }

    hasMinLen(value, min, campo = "") {
        if (!value || value.length < min)
            this.addMessageError(`${campo} - Deverá ter quantidade de caracteres maior ou igual ${max}`);
    }
    hasMax(value, max, campo = "") {
        if (!value || value > max)
            this.addMessageError(`${campo} - Deverá ser menor do que ${max}`);
    }

    hasMin(value, min, campo = "") {
        if (!value || value <= min)
            this.addMessageError(`${campo} - Deverá ser maior do que ${min}`);
    }

    errors() {
        return this.errors;
    }

    clear() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length == 0;
    }
}

module.exports = FluentValidator;