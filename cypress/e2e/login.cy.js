/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        // Usa o comando que configuramos acima
        cy.login(perfil.usuario, perfil.senha)
        
        // Proteção: Espera o link estar visível antes de clicar
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address', { timeout: 15000 })
          .should('be.visible')
          .click()
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.page-title').should('contain', 'Minha conta')
        })
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
    });
});
