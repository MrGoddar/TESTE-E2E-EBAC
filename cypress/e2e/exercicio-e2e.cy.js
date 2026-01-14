/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Adicionar múltiplos produtos ao carrinho', () => {
    // Certifique-se que estes dados são válidos na sua loja EBAC
    const user = 'aluno_ebac@teste.com' 
    const pass = 'teste@teste.com'       

    beforeEach(() => {
        // A sessão evita que o Cypress faça login em todos os testes, economizando tempo
        cy.session('sessao-jenkins', () => {
            cy.visit('minha-conta')
            cy.login(user, pass)
        }, {
            validate() {
                // Se o Jenkins não encontrar isso, ele refaz o login automaticamente
                cy.get('.woocommerce-MyAccount-content', { timeout: 25000 }).should('be.visible')
            }
        })
    });

    it('Deve adicionar produtos ao carrinho e finalizar checkout', () => {
        // Vai para a listagem de produtos
        cy.visit('produtos')
        
        // Seleciona o primeiro produto
        cy.get('.product-block').first().click()
        
        // Escolhe tamanho e cor (ajuste se os nomes forem diferentes no seu site)
        cy.get('.button-variable-item-M', { timeout: 10000 }).should('be.visible').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()

        // Validação de sucesso
        cy.get('.woocommerce-message', { timeout: 15000 }).should('contain', 'adicionado no seu carrinho')
        
        // Vai direto para o checkout para evitar cliques desnecessários
        cy.visit('checkout')

        // Preenche os dados obrigatórios com Faker
        cy.get('#billing_first_name').clear().type(faker.person.firstName())
        cy.get('#billing_last_name').clear().type(faker.person.lastName())
        cy.get('#billing_address_1').clear().type(faker.location.streetAddress())
        cy.get('#billing_city').clear().type(faker.location.city())
        cy.get('#billing_postcode').clear().type('01001-000')
        cy.get('#billing_phone').clear().type('11999999999')

        // Aceita os termos e finaliza
        cy.get('#terms').click({force: true})
        cy.get('#place_order').click({force: true})

        // Espera a mensagem de sucesso final
        cy.get('.woocommerce-notice', { timeout: 30000 }).should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
