/// <reference types="cypress" />
let dadosLogin

context('Funcionalidade Login', () => {
    before(() => {
        // Carrega os dados da fixture antes dos testes
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        // Visita a página inicial de login
        cy.visit('minha-conta')
    });

    afterEach(() => {
        // Tira print em caso de falha (ajuda muito no Jenkins)
        cy.screenshot()
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        // Em vez de 'Endereços' com acento, usamos o padrão da conta
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.url().should('include', 'edit-address')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        // Usando um seletor mais genérico para evitar quebras por texto exato
        cy.get('.woocommerce-MyAccount-content').should('be.visible')
    })
})
