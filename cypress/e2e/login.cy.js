describe('Funcionalidade Login', () => {

    it('Login com sucesso usando Comando customizado', () => {
        cy.login('matheuso54@hotmail.com', '@teste123')
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
            cy.get('.page-title').should('contain', 'Minha conta')
        })
    });
});
