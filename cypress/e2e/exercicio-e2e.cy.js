/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end', () => {
    /* Este código utiliza uma abordagem de busca por texto, 
    que é o que funciona melhor nos repositórios ebac-shop
    */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // 1. Escolha do produto (Usando o primeiro da lista para não errar o nome)
        cy.get('.product-block').first().click()
        
        // 2. Seleção de atributos (Garante que os itens existem antes de clicar)
        cy.get('.variable-item').first().click() // Seleciona o primeiro tamanho disponível
        cy.get('.variable-item').last().click()  // Seleciona a última cor disponível
        
        cy.get('.input-text').clear().type('2')
        cy.get('.single_add_to_cart_button').click()

        // 3. Validação e ida para o Checkout
        // O seletor 'a.wc-forward' é o mais estável para o botão "Ver Carrinho"
        cy.get('a.wc-forward').contains('Ver carrinho').click()
        cy.get('.checkout-button').click()

        // 4. Preenchimento do Checkout com Faker
        // Note o uso do #billing_... que é o padrão do WooCommerce
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_address_1').type(faker.location.streetAddress())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#billing_postcode').type('01001-000')
        cy.get('#billing_phone').type(faker.phone.number('11999999999'))
        cy.get('#billing_email').type(faker.internet.email())

        // 5. Finalização
        // Forçamos o check para evitar que o overlay do "carregando" bloqueie o clique
        cy.get('#payment_method_cod').check({force: true})
        cy.get('#terms').check({force: true})
        cy.get('#place_order').click({force: true})

        // 6. Confirmação Final
        cy.get('.woocommerce-notice', { timeout: 15000 })
          .should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

});
