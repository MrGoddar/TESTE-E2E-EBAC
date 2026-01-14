/// <reference types="cypress" />
let dadosLogin

context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        // Verificação robusta: espera a URL ou o título da página
        cy.get('.page-title', { timeout: 15000 }).should('contain', 'Minha conta')
        // Em vez de ir direto para endereços, garantimos que o painel carregou
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address').should('be.visible').click()
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title', { timeout: 15000 }).should('contain', 'Minha conta')
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title', { timeout: 15000 }).should('contain', 'Minha conta')
    })
})
