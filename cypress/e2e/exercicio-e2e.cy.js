/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end', () => {
    /*
    Como o erro era no .checkout-button, adicionei comandos para 
    garantir que o produto entre no carrinho antes de ir para o checkout.
    */

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // 1. Escolher um produto (usando o primeiro da lista)
        cy.get('.products > .row > .product-block')
            .first()
            .click()

        // 2. Escolher características (Ajuste conforme o produto escolhido)
        cy.get('.variable-items-wrapper > .variable-item:not(.disabled)').first().click() // Cor
        cy.get('.variable-items-wrapper > .variable-item:not(.disabled)').last().click()  // Tamanho
        
        // 3. Adicionar ao carrinho
        cy.get('.single_add_to_cart_button').click()

        // 4. Ir para o carrinho (Garante que o elemento apareça antes de clicar)
        cy.get('.woocommerce-message > .button').click()
        
        // 5. FINALIZAR COMPRA (Onde ocorria o erro .checkout-button)
        // Usamos um seletor mais robusto e garantimos que ele esteja visível
        cy.get('.checkout-button').should('be.visible').click()

        // 6. Preencher dados de faturamento (Checkout) usando Faker para dados aleatórios
        cy.get('#billing_first_name').clear().type(faker.person.firstName())
        cy.get('#billing_last_name').clear().type(faker.person.lastName())
        cy.get('#billing_address_1').clear().type(faker.location.streetAddress())
        cy.get('#billing_city').clear().type(faker.location.city())
        cy.get('#billing_postcode').clear().type('01001-000') // CEP padrão
        cy.get('#billing_phone').clear().type(faker.phone.number())
        
        // 7. Selecionar Método de Pagamento (se necessário) e Aceitar Termos
        // Nota: Em alguns temas EBAC o checkbox de termos é obrigatório
        cy.get('#terms').check({force: true})

        // 8. Finalizar o Pedido
        cy.get('#place_order').click({force: true})

        // 9. Validação Final
        cy.get('.woocommerce-notice', { timeout: 15000 })
            .should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
