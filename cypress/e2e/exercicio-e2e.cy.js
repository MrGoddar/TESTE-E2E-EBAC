/// <reference types="cypress" />

describe('Exercicio - Testes End-to-end', () => {
    it('Deve fazer um pedido de ponta a ponta', () => {
        // Login direto para evitar problemas de sessão no Jenkins
        cy.visit('minha-conta')
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()

        // Seleção do produto
        cy.visit('produtos')
        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()

        // Checkout
        cy.visit('checkout')
        
        // Se os campos já estiverem preenchidos (comum em contas de teste), 
        // o Cypress apenas segue adiante.
        cy.get('#terms').click({force: true})
        cy.get('#place_order').click({force: true})

        // Validação final
        cy.get('.woocommerce-notice', {timeout: 30000}).should('contain', 'recebido')
    });
});
