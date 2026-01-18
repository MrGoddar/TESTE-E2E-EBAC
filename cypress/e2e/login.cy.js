describe('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha)
            // Seletor corrigido conforme a inspeção do elemento
            cy.get('input[name="login"]').click()
            cy.get('.page-title').should('contain', 'Minha conta')
        })
    });
});
