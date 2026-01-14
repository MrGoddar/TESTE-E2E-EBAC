/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

describe('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(perfil.usuario, perfil.senha)
        // No WooCommerce, o link de Logout confirma que você está logado
        cy.get('.woocommerce-MyAccount-navigation-link--customer-logout a', {timeout: 20000})
          .should('be.visible')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-navigation-link--customer-logout a', {timeout: 20000})
              .should('be.visible')
        })
    });
});
