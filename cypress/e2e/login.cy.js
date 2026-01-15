// cypress/e2e/login.cy.js

describe('Funcionalidade Login', () => {

    it('Login com sucesso usando Comando customizado', () => {
        // Dados atualizados conforme sua imagem
        cy.login('matheuso54@hotmail.com', '@teste123')
        
        // Validação de sucesso
        cy.get('.page-title').should('contain', 'Minha conta')
    })

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            // Aqui ele usará os dados que estiverem no seu arquivo perfil.json
            cy.login(dados.usuario, dados.senha)
            cy.get('.page-title').should('contain', 'Minha conta')
        })
    })
})
