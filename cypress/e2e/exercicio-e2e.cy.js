/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end', () => {

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Seleciona o primeiro produto da lista
        cy.get('.product-block').first().click()
        
        // Seleciona atributos (Tamanho e Cor)
        cy.get('.variable-item').first().click()
        cy.get('.variable-item').last().click()
        
        cy.get('.input-text').clear().type('1')
        cy.get('.single_add_to_cart_button').click()

        // CORREÇÃO: Clica no botão "Ver Carrinho" que aparece na mensagem de sucesso
        cy.get('.woocommerce-message > .button').click()

        // Vai para o Checkout
        cy.get('.checkout-button').click()

        // Preenchimento dos dados (Faker)
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_address_1').type(faker.location.streetAddress())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#billing_postcode').type('01001-000')
        cy.get('#billing_phone').type(faker.phone.number('11999999999'))
        cy.get('#billing_email').type(faker.internet.email())

        // Finalização
        cy.get('#payment_method_cod').check({force: true})
        cy.get('#terms').check({force: true})
        cy.get('#place_order').click({force: true})

        // Validação final
        cy.get('.woocommerce-notice', { timeout: 15000 })
          .should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
