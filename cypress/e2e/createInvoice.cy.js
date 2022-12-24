const serverId = "bjjxde9p";
const serverDomain = "utrust@bjjxde9p.mailosaur.io";

describe('Create Invoice', () => {
  let emailAddress = "amayindilynn@gmail.com";
  let passwordValue = "P@$sAm@1";
  let storeName = "Test";
  let paymentDescription = "This is a test invoice creation";
  let fiatAmount = 3000;
  let paymentLink;

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

  it('Fill the new invoice form and generate invoice', () => {
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
    cy.get('input[name="dropdown-input-country"]').type('Nigeria');
    cy.findByText('Nigeria').click();
    cy.get('input[name="dropdown-input-currency"]').type('USD $');
    cy.findByText('USD $').click();
    cy.get('input[name="amount"]').type('3000');
    cy.get(`[id="description"]`).type('This is a test invoice creation');
    cy.get('button:contains("Generate invoice")').click();
    cy.get('h3').contains('Invoice confirmation').should('be.visible');
  })

  it('Test that invoice was created correctly', () => {
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
    cy.get('input[name="customerEmail"]').type(serverDomain);
    cy.get('input[name="billingAddress"]').type('123 Test Avenue');
    cy.get('input[name="city"]').type('Lagos');
    cy.get('input[name="postCode"]').type('100222');
    cy.get('input[name="state"]').type('Lagos');
    cy.get('input[name="dropdown-input-country"]').type('Nigeria');
    cy.findByText('Nigeria').click();
    cy.get('input[name="dropdown-input-currency"]').type('USD $');
    cy.findByText('USD $').click();
    cy.get('input[name="amount"]').type(fiatAmount);
    cy.get(`[id="description"]`).type(paymentDescription);
    cy.get('button:contains("Generate invoice")').click();
    cy.get('h3').contains('Invoice confirmation').should('be.visible');
    cy.get('[data-test="submit-new-invoice-button"]').click();
    cy.get('h3').contains('Invoice sent').should('be.visible');
  })
  
  it('Test that mail was delivered to recipient', () =>{
    const date = new Date();

    return cy
      .mailosaurGetMessage(serverId, {
        sentTo: serverDomain,
        receivedAfter: date.setDate(date.getDate() - 1),
        timeout: 40000,
      })
      .then((email) => {
        expect(email.subject).to.equal("Invoice to pay from Test");
        paymentLink = email.html.links[0].href;
        return email.html.links[0].href;        
      });
  })
  it('Opens payment link sent to email address to verify that the payment page has the correct details', () => {
    cy.visit(paymentLink);
    cy.get('.Details_storeName__3iENh').contains(storeName).should('be.visible');
    cy.get('.List_root__3LLI7 > div').contains(paymentDescription).should('be.visible');
    cy.get('.Details_totalFiat__1Dk90').contains(fiatAmount).should('be.visible');
  })
})