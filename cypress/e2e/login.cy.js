/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
        // Espera o formulário existir para não dar timeout
        cy.get('.login', { timeout: 15000 }).should('be.visible')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(perfil.usuario, perfil.senha)
        cy.get('.page-title', { timeout: 15000 }).should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha, {log: false})
        cy.get('.woocommerce-form-login__submit').click({ force: true })
        cy.get('.page-title').should('contain', 'Minha conta')
    });
});
