// cypress/e2e/exercicio-e2e.cy.js

describe('Exercicio - Testes End-to-end', () => {

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Visita a vitrine
        cy.visit('produtos/')

        // Seleciona o primeiro produto
        cy.get('.product-block').first().click()

        // Seleciona variações e adiciona ao carrinho
        cy.get('.button-variable-item-S').should('be.visible').click()
        cy.get('.button-variable-item-Blue').should('be.visible').click()
        cy.get('.single_add_to_cart_button').click()

        // Clique no botão que aparece na mensagem de sucesso (mais estável no Jenkins)
        cy.get('.woocommerce-message > .button').should('be.visible').click()
        
        // Ir para o Checkout
        cy.get('.checkout-button').should('be.visible').click()

        // Finalizar Pedido
        cy.get('#terms').click({ force: true })
        cy.get('#place_order').click({ force: true })

        // Validação final com espera estendida para o servidor da EBAC
        cy.get('.woocommerce-notice', { timeout: 20000 })
            .should('be.visible')
            .and('contain', 'recebido')
    })
})
