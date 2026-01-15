describe('Exercicio - Testes End-to-end', () => {
    
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Seleciona o primeiro produto da lista
        cy.get('.product-block').first().click()
        
        // Seleciona as variações (Tamanho e Cor) - Essencial para o botão comprar aparecer
        cy.get('.variable-item-tuple-size').first().click()
        cy.get('.variable-item-tuple-color').first().click()
        
        // Clica em comprar
        cy.get('.single_add_to_cart_button').click()

        // Valida se o produto entrou no carrinho
        cy.get('.woocommerce-message').should('contain', 'adicionado no seu carrinho')
        
        // Checkout
        cy.get('.woocommerce-message > .button').click() // Botão "Ver Carrinho"
        cy.get('.checkout-button').click() // Botão "Fechar Compra"

        // Preenchimento de Checkout
        // Nota: Se o login não foi feito antes, ele pedirá dados aqui
        cy.get('#billing_first_name').clear().type('Teste')
        cy.get('#billing_last_name').clear().type('EBAC')
        cy.get('#billing_address_1').clear().type('Rua de Teste, 123')
        cy.get('#billing_city').clear().type('São Paulo')
        cy.get('#billing_postcode').clear().type('01001-000')
        cy.get('#billing_phone').clear().type('11999999999')
        
        cy.get('#payment_method_cod').click() // Pagamento na entrega
        cy.get('#terms').click()
        cy.get('#place_order').click()

        // Validação de sucesso
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
