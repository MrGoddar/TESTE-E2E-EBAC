/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end', () => {

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Seleciona o primeiro produto
        cy.get('.product-block', { timeout: 10000 }).first().click()
        
        // Seleciona atributos
        cy.get('.variable-item').first().click()
        cy.get('.variable-item').last().click()
        
        cy.get('.input-text').clear().type('1')
        cy.get('.single_add_to_cart_button').click()

        // AJUSTE: Espera a mensagem de sucesso aparecer antes de buscar o botão
        cy.get('.woocommerce-message', { timeout: 15000 }).should('be.visible')
        cy.get('.woocommerce-message > .button').click()

        // Checkout
        cy.get('.checkout-button').should('be.visible').click()

        // Dados de faturamento
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_address_1').type(faker.location.streetAddress())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#billing_postcode').type('01001-000')
        cy.get('#billing_phone').type('11999999999')
        cy.get('#billing_email').type(faker.internet.email())

        // Finalização com force: true para garantir o clique no Jenkins
        cy.get('#payment_method_cod').check({force: true})
        cy.get('#terms').check({force: true})
        cy.get('#place_order').click({force: true})

        // Validação
        cy.get('.woocommerce-notice', { timeout: 20000 })
          .should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
