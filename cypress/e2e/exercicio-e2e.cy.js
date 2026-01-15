/// <reference types="cypress" />

context('Exercicio - Testes End-to-end', () => {

    beforeEach(() => {
        // Aumentamos a segurança visitando a lista de produtos diretamente
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // 1. Escolha do produto usando um seletor mais comum em WooCommerce
        // Esperamos o container de produtos aparecer antes de clicar
        cy.get('.products .product-block', { timeout: 10000 }).first().click()
        
        // 2. Seleção de Tamanho e Cor (ajustado para ser mais flexível)
        cy.get('.variable-items-wrapper .variable-item:not(.disabled)').first().click()
        cy.get('.variable-items-wrapper .variable-item:not(.disabled)').last().click()
        cy.get('.single_add_to_cart_button').click()

        // 3. Ir para o Checkout
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').should('be.visible').click()

        // 4. Preenchimento de dados fixos
        cy.get('#billing_first_name').clear().type('Aluno')
        cy.get('#billing_last_name').clear().type('EBAC')
        cy.get('#billing_address_1').clear().type('Rua de Teste, 123')
        cy.get('#billing_city').clear().type('São Paulo')
        cy.get('#billing_postcode').clear().type('01001-000')
        cy.get('#billing_phone').clear().type('11999999999')
        cy.get('#billing_email').clear().type('teste_aluno@ebac.com.br')
        
        // 5. Finalização
        // Às vezes o checkbox de termos precisa de um force:true
        cy.get('#terms').check({force: true})
        cy.get('#place_order').click({force: true})

        // 6. Validação final
        cy.get('.woocommerce-notice', { timeout: 20000 })
            .should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
