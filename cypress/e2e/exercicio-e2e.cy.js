/// <reference types="cypress" />

context('Exercicio - Testes End-to-end', () => {

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Seleção de produto
        cy.get('.products > .row > .product-block').first().click()
        cy.get('.variable-items-wrapper > .variable-item:not(.disabled)').first().click()
        cy.get('.variable-items-wrapper > .variable-item:not(.disabled)').last().click()
        cy.get('.single_add_to_cart_button').click()

        // Carrinho e Checkout
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').should('be.visible').click()

        // Preenchimento com dados fixos (para não dar erro de compilação no Git/Jenkins)
        cy.get('#billing_first_name').clear().type('Aluno')
        cy.get('#billing_last_name').clear().type('EBAC')
        cy.get('#billing_address_1').clear().type('Rua de Teste, 123')
        cy.get('#billing_city').clear().type('São Paulo')
        cy.get('#billing_postcode').clear().type('01001-000')
        cy.get('#billing_phone').clear().type('11999999999')
        cy.get('#billing_email').clear().type('teste_aluno@ebac.com.br')
        
        // Finalização
        cy.get('#terms').check({force: true})
        cy.get('#place_order').click({force: true})

        // Validação
        cy.get('.woocommerce-notice', { timeout: 15000 })
            .should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
