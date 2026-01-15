/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end', () => {
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Adicionando produtos usando o comando customizado
        cy.addProdutos('Abraxas Gym Pant', '32', 'Blue', 2)
        
        // Espera a mensagem de sucesso aparecer antes de clicar no carrinho
        cy.get('.woocommerce-message').should('contain', 'no seu carrinho')
        cy.get('.woocommerce-message > .button').click()

        // Página de Carrinho -> Checkout
        cy.get('.checkout-button').click()

        // Preenchimento de Checkout com dados aleatórios
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_address_1').type(faker.location.streetAddress())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#billing_postcode').type('01001-000')
        cy.get('#billing_phone').type(faker.phone.number())
        cy.get('#billing_email').type(faker.internet.email())

        // Finalização
        cy.get('#payment_method_cod').check()
        cy.get('#terms').check()
        cy.get('#place_order').click()

        // Validação final
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
