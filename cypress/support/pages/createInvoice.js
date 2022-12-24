const serverId = "bjjxde9p";
const serverDomain = "utrust@bjjxde9p.mailosaur.io";

let emailAddress = "amayindilynn@gmail.com";
let passwordValue = "P@$sAm@1";
let storeName = "Test";
let paymentDescription = "This is a test invoice creation";
let fiatAmount = 3000;
let paymentLink;
export class CreateInvoicePage {
  logIn() {
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type(emailAddress);
    cy.get('input[name="password"]').type(passwordValue);
    cy.get('button:contains("Sign in")').click();
  }

  accessPaymentPage() {
    cy.get("h2").contains("1st. Collect payments").should("be.visible");
    cy.viewport(1114, 700);
    cy.get('span:contains("Payments")').click();
  }

  accessInvoiceTab() {
    cy.get("a").contains("Invoices").click();
  }

  accessNewInvoicePage() {
    cy.get('span:contains("New invoice")').click({ force: true });
  }

  fillInvoiceForm() {
    cy.get('input[name="customerName"]').type("Ama Lynn");
    cy.get('input[name="customerEmail"]').type(serverDomain);
    cy.get('input[name="billingAddress"]').type("123 Test Avenue");
    cy.get('input[name="city"]').type("Lagos");
    cy.get('input[name="postCode"]').type("100222");
    cy.get('input[name="state"]').type("Lagos");
    cy.get('input[name="dropdown-input-country"]').type("Nigeria");
    cy.findByText("Nigeria").click();
    cy.get('input[name="dropdown-input-currency"]').type("USD $");
    cy.findByText("USD $").click();
    cy.get('input[name="amount"]').type("3000");
    cy.get(`[id="description"]`).type("This is a test invoice creation");
    cy.get('button:contains("Generate invoice")').click();
  }

  sendInvoice() {
    cy.get('[data-test="submit-new-invoice-button"]').click();
    cy.get("h3").contains("Invoice sent").should("be.visible");
  }

  getPaymentLink() {
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
  }

  verifyPaymentLinkDetails() {
    cy.visit(paymentLink);
    cy.get(".Details_storeName__3iENh")
      .contains(storeName)
      .should("be.visible");
    cy.get(".List_root__3LLI7 > div")
      .contains(paymentDescription)
      .should("be.visible");
    cy.get(".Details_totalFiat__1Dk90")
      .contains(fiatAmount)
      .should("be.visible");
  }
}
