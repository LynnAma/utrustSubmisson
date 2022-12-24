import { CreateInvoicePage } from "../../cypress/support/pages/createInvoice";

const createNewInvoice = new CreateInvoicePage();

describe("Create Invoice", () => {
  let storeName = "Test";
  let paymentDescription = "This is a test invoice creation";
  let fiatAmount = 3000;

  beforeEach(() => {
    createNewInvoice.logIn();
  });

  it("Log into the application", () => {
    cy.get("h2").contains("1st. Collect payments").should("be.visible");
  });

  it("It opens the payment page", () => {
    createNewInvoice.accessPaymentPage();
    cy.get("h1").contains("Payments").should("be.visible");
  });

  it("It navigates to the invoice tab", () => {
    createNewInvoice.accessPaymentPage();
    createNewInvoice.accessInvoiceTab();
    cy.get('span:contains("New invoice")').should("be.visible");
  });

  it("It navigates to the new invoice page", () => {
    createNewInvoice.accessPaymentPage();
    createNewInvoice.accessInvoiceTab();
    createNewInvoice.accessNewInvoicePage();
    cy.get("h1").contains("New invoice").should("be.visible");
  });

  it("Fill the new invoice form and generate invoice", () => {
    createNewInvoice.accessPaymentPage();
    createNewInvoice.accessInvoiceTab();
    createNewInvoice.accessNewInvoicePage();
    createNewInvoice.fillInvoiceForm();
    cy.get("h3").contains("Invoice confirmation").should("be.visible");
  });

  it("Test that mail was delivered to recipient", () => {
    createNewInvoice.accessPaymentPage();
    createNewInvoice.accessInvoiceTab();
    createNewInvoice.accessNewInvoicePage();
    createNewInvoice.fillInvoiceForm();
    createNewInvoice.sendInvoice();
    cy.get("h3").contains("Invoice sent").should("be.visible");
    createNewInvoice.getPaymentLink();
  });
  it("Opens payment link sent to email address to verify that the payment page has the correct details", () => {
    createNewInvoice.verifyPaymentLinkDetails();
    cy.get(".Details_storeName__3iENh")
      .contains(storeName)
      .should("be.visible");
    cy.get(".List_root__3LLI7 > div")
      .contains(paymentDescription)
      .should("be.visible");
    cy.get(".Details_totalFiat__1Dk90")
      .contains(fiatAmount)
      .should("be.visible");
  });
});
