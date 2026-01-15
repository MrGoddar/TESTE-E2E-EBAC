/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá')
    });

    it('Login usando fixture', () => {
        cy.login(perfil.usuario, perfil.senha)
        cy.get('.page-title').should('contain', 'Minha conta')
    });
});
