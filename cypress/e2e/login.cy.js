/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade Login', () => {

    beforeEach(() => {
        // CORREÇÃO: Garante que está na página de login antes de cada teste
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        // Usando o comando login que deve estar em support/commands.js
        cy.login(perfil.usuario, perfil.senha)
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha, {log: false})
        // CORREÇÃO: Seletor de botão mais genérico
        cy.get('.woocommerce-form-login__submit').click()
        cy.get('.page-title').should('contain', 'Minha conta')
    });
});
