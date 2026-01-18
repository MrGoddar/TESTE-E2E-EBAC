/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end', () => {
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // 1. Adicionar produto
        cy.addProdutos('Abraxas Gym Pant', '32', 'Blue', 2)
        
        // 2. Ir para o carrinho
        cy.get('.woocommerce-message > .button').click()

        // 3. Ir para Checkout (Garante que o botão está clicável)
        cy.get('button[name="login"]', { timeout: 30000 }).should('be.visible').click()

        // 4. Preencher Checkout
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_address_1').type(faker.location.streetAddress())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#billing_postcode').type('01001-000')
        cy.get('#billing_phone').type(faker.phone.number('###########'))
        cy.get('#billing_email').type(faker.internet.email())

        // 5. Finalizar (Uso do force:true para evitar bloqueios de UI)
        cy.get('#payment_method_cod').check({force: true})
        cy.get('#terms').check({force: true})
        cy.get('#place_order').click({force: true})

        // 6. Validação
        cy.get('.woocommerce-notice', { timeout: 20000 })
          .should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
