describe('Exercicio - Testes End-to-end', () => {
    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Seleciona o primeiro produto da lista
        cy.get('.product-block').first().click()

        // Ajuste: Clicar no primeiro tamanho e cor disponíveis, independente do nome
        cy.get('.variable-items-wrapper .variable-item:not(.disabled)').first().click()
        cy.get('.variable-items-wrapper .variable-item:not(.disabled)').last().click()
        
        cy.get('.single_add_to_cart_button').click()

        // Seleciona o botão "Ver carrinho" que aparece na mensagem de sucesso
        cy.get('.woocommerce-message > .button').click()

        // Finaliza o Checkout
        cy.get('.checkout-button').click()

        // Dados de faturamento (Preencha com dados genéricos)
        cy.get('#billing_first_name').clear().type('Matheus')
        cy.get('#billing_last_name').clear().type('Teste')
        cy.get('#billing_address_1').clear().type('Rua de Teste, 123')
        cy.get('#billing_city').clear().type('São Paulo')
        cy.get('#billing_postcode').clear().type('01001-000')
        cy.get('#billing_phone').clear().type('11999999999')

        cy.get('#payment_method_cod').click()
        cy.get('#terms').click({force: true})
        cy.get('#place_order').click()

        // Validação final de sucesso
        cy.get('.woocommerce-notice', {timeout: 10000}).should('contain', 'recebido')
    });
});
