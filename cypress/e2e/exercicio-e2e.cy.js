describe('Exercicio - Testes End-to-end', () => {
    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Selecionando o produto (Exemplo baseado na sua imagem)
        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Orange').click()
        cy.get('.single_add_to_cart_button').click()

        // CORREÇÃO: Usando o seletor específico que aparece no seu console
        // O Cypress aguardará o botão "Ver carrinho" aparecer após o clique acima
        cy.get('.woocommerce-message .button.wc-forward').click()

        // Fluxo de Checkout
        cy.get('.checkout-button').click()

        // Preenchimento de dados (Ajuste os seletores se necessário)
        cy.get('#billing_first_name').type('Matheus')
        cy.get('#billing_last_name').type('Teste')
        cy.get('#billing_address_1').type('Rua de Teste, 123')
        cy.get('#billing_city').type('São Paulo')
        cy.get('#billing_postcode').type('01001-000')
        cy.get('#billing_phone').type('11999999999')

        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        // Validação final
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
