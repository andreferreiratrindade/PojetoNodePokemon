const FluentValidation = require('../../../src/validators/fluentValidator');

describe('Validators: Fluent', () => {
    describe('Campos obrigatórios: isRequired', () => {
        it('Deve validar campo obrigatório', () => {

            const fluentValidator = new FluentValidation();

            fluentValidator.isRequired("teste");

            expect(fluentValidator.isValid()).to.be.eql(true);

        });

        it('Deve recusar obj null', () => {

            const fluentValidator = new FluentValidation();
            fluentValidator.isRequired("");
            fluentValidator.isRequired();

            expect(fluentValidator.isValid()).to.be.eql(false);

        });
    });

    describe('Quantidade máxima de caractéres: hasMaxLen', () => {
        it('Deve validar quantidade máxima de caractere', () => {

            const fluentValidator = new FluentValidation();

            fluentValidator.hasMaxLen("teste", 10);

            expect(fluentValidator.isValid()).to.be.eql(true);

        });

        it('Deve recusar quantidade máxima de caractere', () => {

            const fluentValidator = new FluentValidation();

            fluentValidator.hasMaxLen("teste teste teste teste teste teste", 10);

            expect(fluentValidator.isValid()).to.be.eql(false);

        });
    });
    
});