/// <reference types="cypress" />

describe('Funcionalidade: Adicionar múltiplos produtos', () => {
    it('Deve adicionar produtos com login direto', () => {
        cy.visit('minha-conta')
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
        cy.visit('produtos')
        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', 'adicionado')
    });
});
