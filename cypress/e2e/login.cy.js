/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

describe('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(perfil.usuario, perfil.senha)
        
        // Espera o menu lateral de endereços estar visível antes de clicar
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a', { timeout: 15000 })
          .should('be.visible')
          .click()
        
        cy.get('.woocommerce-column__title').should('contain', 'Endereço de faturamento')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content', { timeout: 15000 }).should('be.visible')
        })
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
    });
});
