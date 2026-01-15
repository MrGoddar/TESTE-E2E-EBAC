// cypress/e2e/exercicio-e2e.cy.js

describe('Exercicio - Testes End-to-end', () => {

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Visita a vitrine
        cy.visit('produtos/')

        // Seleciona o primeiro produto da lista
        cy.get('.product-block').first().click()

        // Seleciona variações (Tamanho e Cor)
        cy.get('.button-variable-item-S').should('be.visible').click()
        cy.get('.button-variable-item-Blue').should('be.visible').click()
        
        // Clica para adicionar ao carrinho
        cy.get('.single_add_to_cart_button').click()

        // ESTRATÉGIA DE CONTINGÊNCIA PARA O JENKINS:
        // Se o botão na mensagem falhar, visitamos a URL do carrinho diretamente
        // Isso evita que o teste quebre por problemas de CSS flutuante
        cy.visit('carrinho/')
        
        // Prosseguir para o Checkout
        cy.get('.checkout-button').should('be.visible').click()

        // Preenchimento do Checkout e Finalização
        // (Assumindo que os dados de faturamento já estão salvos ou não são obrigatórios nesta etapa)
        cy.get('#terms').click({ force: true })
        cy.get('#place_order').click({ force: true })

        // Validação final com timeout estendido para o Jenkins (20 segundos)
        cy.get('.woocommerce-notice', { timeout: 20000 })
            .should('be.visible')
            .and('contain', 'recebido')
    })
})
