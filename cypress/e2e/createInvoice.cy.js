describe('Create Invoice', () => {
  let emailAddress = "amayindilynn@gmail.com";
  let passwordValue = "P@$sAm@1";

  it('Log into the application', () => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(emailAddress);
    cy.get('input[name="password"]').type(passwordValue);
    cy.get('button:contains("Sign in")').click();
    cy.get('h2').contains('1st. Collect payments').should('be.visible');
  })
})