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

  it('It opens the payment page', () => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(emailAddress);
    cy.get('input[name="password"]').type(passwordValue);
    cy.get('button:contains("Sign in")').click();
    cy.get('h2').contains('1st. Collect payments').should('be.visible');
    cy.viewport(1114, 700)
    cy.get('span:contains("Payments")').click();
    cy.get('h1').contains('Payments').should('be.visible');
  })

  it('It navigates to the invoice tab', () => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(emailAddress);
    cy.get('input[name="password"]').type(passwordValue);
    cy.get('button:contains("Sign in")').click();
    cy.get('h2').contains('1st. Collect payments').should('be.visible');
    cy.viewport(1114, 700)
    cy.get('span:contains("Payments")').click();
    cy.get('h1').contains('Payments').should('be.visible'); 
    cy.get('a').contains('Invoices').click();
    cy.get('span:contains("New invoice")').should('be.visible')
  })

  it('It navigates to the new invoice page', () => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(emailAddress);
    cy.get('input[name="password"]').type(passwordValue);
    cy.get('button:contains("Sign in")').click();
    cy.get('h2').contains('1st. Collect payments').should('be.visible');
    cy.viewport(1114, 700)
    cy.get('span:contains("Payments")').click();
    cy.get('h1').contains('Payments').should('be.visible'); 
    cy.get('a').contains('Invoices').click();
    cy.get('span:contains("New invoice")').click({force:true});
    cy.get('h1').contains('New invoice').should('be.visible');
  })

  it('Fill the new invoice form', () => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(emailAddress);
    cy.get('input[name="password"]').type(passwordValue);
    cy.get('button:contains("Sign in")').click();
    cy.get('h2').contains('1st. Collect payments').should('be.visible');
    cy.viewport(1114, 700)
    cy.get('span:contains("Payments")').click();
    cy.get('h1').contains('Payments').should('be.visible'); 
    cy.get('a').contains('Invoices').click();
    cy.get('span:contains("New invoice")').click({force:true});
    cy.get('h1').contains('New invoice').should('be.visible');
    cy.get('input[name="customerName"]').type('Ama Lynn');
    cy.get('input[name="customerEmail"]').type(emailAddress);
    cy.get('input[name="billingAddress"]').type('123 Test Avenue');
    cy.get('input[name="city"]').type('Lagos');
    cy.get('input[name="postCode"]').type('100222');
    cy.get('input[name="state"]').type('Lagos');

  })
})